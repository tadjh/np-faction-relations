import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, createRef } from 'react';
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
import { useHighlight } from './hooks';
import { composeCellKey } from './utils';
import clsx from 'clsx';

function Grid() {
  const { factions } = useFactions();
  // const { gridRef, constraints } = useGrid(headerRef, footerRef);

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
    <AnimatePresence>
      {factions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative grid md:m-7 md:shadow-xl"
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
            const isLastRow = factionIds.length === padRowIndex;
            return (
              <div key={`row-${rowFactionId}`} className="group contents">
                <GridHeaderCell
                  rowIndex={padRowIndex}
                  columnIndex={0}
                  faction={faction}
                  factionId={rowFactionId}
                  onMouseEnter={handleMouseLeave}
                  className={clsx(
                    isLastRow &&
                      'border-b-gray-400 hover:border-b-gray-200 group-hover:border-b-gray-200'
                  )}
                />
                {factionIds.map((columnFactionId, columnIndex) => {
                  const padColumnIndex = columnIndex + 1;
                  const isLastColumn = factionIds.length === padColumnIndex;
                  return (
                    <GridCell
                      key={composeCellKey(padRowIndex, padColumnIndex)}
                      rowIndex={padRowIndex}
                      columnIndex={padColumnIndex}
                      faction={faction}
                      columnFactionId={columnFactionId}
                      handleMouseEnter={handleMouseEnter}
                      className={clsx(
                        isLastColumn &&
                          'border-r-gray-400 hover:border-r-gray-200',
                        isLastRow && 'border-b-gray-400 hover:border-b-gray-200'
                      )}
                    />
                  );
                })}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Grid;
