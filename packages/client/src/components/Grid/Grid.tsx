import clsx from 'clsx';
import { Fragment } from 'react';
import { CELL_SIZE_X, CELL_SIZE_Y, HEADER_SIZE } from '../../config/constants';
import { backgroundColor, headerColor } from '../../config/styles';
import { useFactions } from '../../hooks';
import Legend from '../Legend';

function Grid() {
  const { factions, length } = useFactions();
  return (
    <div
      className="grid relative text-[8px]"
      style={{
        gridTemplateColumns: `${HEADER_SIZE}px repeat(${length},${CELL_SIZE_X}px)`,
        gridTemplateRows: `${HEADER_SIZE}px repeat(${length},${CELL_SIZE_Y}px)`,
      }}
    >
      <Legend />
      {factions &&
        factions.map((gang, x) => (
          <div
            key={`row1col${x + 2}`}
            className={clsx(
              'border text-center flex items-center justify-center',
              headerColor(x),
              'border-t-stone-900 border-b-stone-900',
              x === factions.length - 1 && 'border-r-stone-900'
            )}
          >
            <span className="-rotate-90">{gang.displayName || gang.name}</span>
          </div>
        ))}
      {factions &&
        Array<boolean>(factions.length)
          .fill(true)
          .map((_, y) => (
            <Fragment key={factions[y].id}>
              <div
                key={`row${y + 2}col1`}
                className={clsx(
                  'border text-center flex items-center justify-center border-l-stone-900 border-r-stone-900',
                  y === factions.length - 1 && 'border-b-stone-900',
                  headerColor(y)
                )}
              >
                {factions[y].displayName || factions[y].name}
              </div>
              {Array<boolean>(factions.length)
                .fill(true)
                .map((_, x) => (
                  <div
                    key={`row${y + 2}col${x + 2}`}
                    className={clsx(
                      'border text-center flex justify-center items-center',
                      backgroundColor(factions, x, y),
                      y === factions.length - 1 && 'border-b-stone-900',
                      x === factions.length - 1 && 'border-r-stone-900'
                    )}
                  >
                    {x === y && factions[y].attributes.benchCount > 1 && (
                      <span className="text-xs text-amber-100">
                        {factions[y].attributes.benchCount}
                      </span>
                    )}
                  </div>
                ))}
            </Fragment>
          ))}
    </div>
  );
}

export default Grid;
