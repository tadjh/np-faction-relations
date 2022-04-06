import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';
import { CELL_SIZE_X, CELL_SIZE_Y, HEADER_SIZE } from '../../config/constants';
import { backgroundColor, headerColor } from '../../config/styles';
import { useFactions } from '../../hooks';
import Legend from '../Legend';

function Grid() {
  const { factions, length } = useFactions();

  if (!factions) return null;
  return (
    <AnimatePresence>
      {factions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid relative text-[8px]"
          style={{
            gridTemplateColumns: `${HEADER_SIZE} repeat(${length},${CELL_SIZE_X}px)`,
            gridTemplateRows: `${HEADER_SIZE} repeat(${length},${CELL_SIZE_Y}px)`,
          }}
        >
          <Legend />
          {Object.keys(factions).map((id, x, array) => (
            <div
              key={`row1col${x + 2}`}
              className={clsx(
                'border text-center flex items-center justify-center',
                headerColor(x),
                'border-t-stone-900 border-b-stone-900',
                x === length - 1 && 'border-r-stone-900'
              )}
            >
              <span className="-rotate-90">
                {factions[id].displayName || factions[id].name}
              </span>
            </div>
          ))}
          {Object.keys(factions).map((id, y) => (
            <Fragment key={`y-${id}`}>
              <div
                key={`row${y + 2}col1`}
                className={clsx(
                  'border text-center flex items-center justify-center border-l-stone-900 border-r-stone-900',
                  y === length - 1 && 'border-b-stone-900',
                  headerColor(y)
                )}
              >
                {factions[id].displayName || factions[id].name}
              </div>
              {Object.keys(factions).map((xId, x) => (
                <div
                  key={`row${y + 2}col${x + 2}`}
                  className={clsx(
                    'border text-center flex justify-center items-center',
                    backgroundColor(factions[id], x, y, xId),
                    y === length - 1 && 'border-b-stone-900',
                    x === length - 1 && 'border-r-stone-900'
                  )}
                >
                  {x === y && factions[id].attributes.benchCount > 1 && (
                    <span className="text-xs text-amber-100">
                      {factions[id].attributes.benchCount}
                    </span>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Grid;
