import { AnimatePresence, motion } from 'framer-motion';
import { MutableRefObject, useMemo, createRef } from 'react';
import { CELL_SIZE_X, CELL_SIZE_Y, HEADER_SIZE } from '../../config/constants';
import { getFaction, useFactions } from '../../hooks';
import { isStrictEqual } from '../../utils';
import GridCell from './components/GridCell';
import GridHeader from './components/GridHeader';
import GridHeaderCell from './components/GridHeaderCell';
import GridOverlay from './components/GridOverlay';
import { useGrid, useHighlight } from './hooks';

export interface GridProps {
  headerRef: MutableRefObject<HTMLDivElement | null>;
  footerRef: MutableRefObject<HTMLDivElement | null>;
}

function Grid({ headerRef, footerRef }: GridProps) {
  const { factions, length } = useFactions();
  const { gridRef, constraints } = useGrid(headerRef, footerRef);

  const factionIds = useMemo(() => Object.keys(factions || {}), [factions]);
  const columnRefs = useMemo(
    () => ['legend', ...factionIds].map(() => createRef<HTMLDivElement>()),
    [factionIds]
  );

  const { handleMouseEnter, handleMouseLeave } = useHighlight(columnRefs);

  return (
    <div className="absolute font-mono left-0 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 p-4">
      <AnimatePresence>
        {factions && (
          <motion.div
            drag
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            dragMomentum={false}
            ref={gridRef}
            dragConstraints={constraints}
            className="grid relative text-[8px] shadow-xl border border-gray-400"
            style={{
              gridTemplateColumns: `${HEADER_SIZE} repeat(${length},${CELL_SIZE_X}px)`,
              gridTemplateRows: `${HEADER_SIZE} repeat(${length},${CELL_SIZE_Y}px)`,
            }}
            onMouseLeave={handleMouseLeave}
          >
            <GridOverlay
              length={length}
              factionIds={factionIds}
              columnRefs={columnRefs}
            />
            <GridHeader
              factionIds={factionIds}
              factions={factions}
              length={length}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {factionIds.map((rowFactionId, rowIndex) => {
              const faction = getFaction(factions, rowFactionId);
              const padRowIndex = rowIndex + 1;
              return (
                <div key={`row-${rowFactionId}`} className="contents group">
                  <GridHeaderCell
                    rowIndex={padRowIndex}
                    columnIndex={0}
                    isLast={isStrictEqual(padRowIndex, length)}
                    faction={faction}
                    onMouseEnter={handleMouseLeave}
                  />
                  {factionIds.map((columnFactionId, columnIndex) => {
                    const padColumnIndex = columnIndex + 1;
                    return (
                      <GridCell
                        rowIndex={padRowIndex}
                        columnIndex={padColumnIndex}
                        faction={faction}
                        columnFactionId={columnFactionId}
                        isBottom={isStrictEqual(padRowIndex, length)}
                        isLast={isStrictEqual(padColumnIndex, length)}
                        handleMouseEnter={handleMouseEnter}
                      />
                    );
                  })}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Grid;
