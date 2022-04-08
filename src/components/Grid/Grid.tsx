import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';
import { CELL_SIZE_X, CELL_SIZE_Y, HEADER_SIZE } from '../../config/constants';
import { headerColor } from '../../config/styles';
import {
  composeShortName,
  getBenchCount,
  getFaction,
  useFactions,
} from '../../hooks';
import { AssociativeFactionProps } from '../../types';
import { isEmptyObject, isGreaterThan, isStrictEqual } from '../../utils';
import Legend from '../Legend';
import { backgroundColor } from './styles';

export function shouldHideGrid(factions: AssociativeFactionProps | null) {
  return factions === null || isEmptyObject(factions);
}

function Grid() {
  const { factions, length } = useFactions();

  if (shouldHideGrid(factions)) return null;

  const factionIds = Object.keys(factions || {});

  return (
    <AnimatePresence>
      {factions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid relative text-[8px] shadow-xl"
          style={{
            gridTemplateColumns: `${HEADER_SIZE} repeat(${length},${CELL_SIZE_X}px)`,
            gridTemplateRows: `${HEADER_SIZE} repeat(${length},${CELL_SIZE_Y}px)`,
          }}
        >
          <Legend />
          {factionIds.map((columnFaction, columnIndex) => {
            const faction = getFaction(factions, columnFaction);
            return (
              <div
                key={`row1col${columnIndex + 2}`}
                className={clsx(
                  'border text-center flex items-center justify-center',
                  headerColor(columnIndex),
                  'border-t-stone-900 border-b-stone-900',
                  isStrictEqual(columnIndex, length - 1) && 'border-r-stone-900'
                )}
              >
                <span className="-rotate-90">{composeShortName(faction)}</span>
              </div>
            );
          })}
          {factionIds.map((rowFactionId, rowIndex) => {
            const faction = getFaction(factions, rowFactionId);
            const benchCount = getBenchCount(faction);
            return (
              <Fragment key={`y-${rowFactionId}`}>
                <div
                  key={`row${rowIndex + 2}col1`}
                  className={clsx(
                    'border text-center flex items-center justify-center border-l-stone-900 border-r-stone-900',
                    isStrictEqual(rowIndex, length - 1) && 'border-b-stone-900',
                    headerColor(rowIndex)
                  )}
                >
                  {composeShortName(faction)}
                </div>
                {factionIds.map((columnFactionId, columnIndex) => (
                  <div
                    key={`row${rowIndex + 2}col${columnIndex + 2}`}
                    className={clsx(
                      'border text-center flex justify-center items-center',
                      backgroundColor(
                        faction,
                        columnIndex,
                        rowIndex,
                        columnFactionId
                      ),
                      isStrictEqual(rowIndex, length - 1) &&
                        'border-b-stone-900',
                      isStrictEqual(columnIndex, length - 1) &&
                        'border-r-stone-900'
                    )}
                  >
                    {isStrictEqual(columnIndex, rowIndex) &&
                      isGreaterThan(benchCount, 1) && (
                        <span className="text-xs text-amber-100">
                          {benchCount}
                        </span>
                      )}
                  </div>
                ))}
              </Fragment>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Grid;
