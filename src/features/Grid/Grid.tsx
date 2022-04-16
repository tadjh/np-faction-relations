import { AnimatePresence, motion } from 'framer-motion';
import { MutableRefObject, useMemo, createRef } from 'react';
import {
  CELL_COLUMN_WIDTH,
  CELL_ROW_HEIGHT,
  HEADER_SIZE,
} from './config/constants';
import { getFaction, useFactions } from '../../hooks';
import GridCell from './components/GridCell';
import GridHeader from './components/GridHeader';
import GridHeaderCell from './components/GridHeaderCell';
import GridOverlay from './components/GridOverlay';
import { useGrid, useHighlight } from './hooks';
import { composeCellKey } from './utils';

export interface GridProps {
  headerRef: MutableRefObject<HTMLDivElement | null>;
  footerRef: MutableRefObject<HTMLDivElement | null>;
}

function Grid({ headerRef, footerRef }: GridProps) {
  const { factions } = useFactions();
  const { gridRef, constraints } = useGrid(headerRef, footerRef);

  const factionIds = useMemo(() => Object.keys(factions || {}), [factions]);
  const columnRefs = useMemo(
    () => ['legend', ...factionIds].map(() => createRef<HTMLDivElement>()),
    [factionIds]
  );
  const headerRefs = useMemo(
    () => ['legend', ...factionIds].map(() => createRef<HTMLDivElement>()),
    [factionIds]
  );

  const { handleMouseEnter, handleMouseLeave } = useHighlight(
    columnRefs,
    headerRefs
  );

  return (
    <div className="absolute left-0 font-mono text-[8px] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
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
            className="relative grid border border-gray-400 shadow-xl"
            style={{
              gridTemplateColumns: `${HEADER_SIZE} repeat(${factionIds.length},${CELL_COLUMN_WIDTH})`,
              gridTemplateRows: `${HEADER_SIZE} repeat(${factionIds.length},${CELL_ROW_HEIGHT})`,
            }}
            onMouseLeave={handleMouseLeave}
          >
            <GridOverlay factionIds={factionIds} columnRefs={columnRefs} />
            <GridHeader
              factionIds={factionIds}
              factions={factions}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              headerRefs={headerRefs}
            />
            {factionIds.map((rowFactionId, rowIndex) => {
              const faction = getFaction(factions, rowFactionId);
              const padRowIndex = rowIndex + 1;
              return (
                <div key={`row-${rowFactionId}`} className="group contents">
                  <GridHeaderCell
                    rowIndex={padRowIndex}
                    columnIndex={0}
                    faction={faction}
                    factionId={rowFactionId}
                    onMouseEnter={handleMouseLeave}
                  />
                  {factionIds.map((columnFactionId, columnIndex) => {
                    const padColumnIndex = columnIndex + 1;
                    return (
                      <GridCell
                        key={composeCellKey(padRowIndex, padColumnIndex)}
                        rowIndex={padRowIndex}
                        columnIndex={padColumnIndex}
                        faction={faction}
                        columnFactionId={columnFactionId}
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
