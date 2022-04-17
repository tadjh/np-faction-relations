import clsx from 'clsx';
import { DOMAttributes } from 'react';
import {
  COLOR_AFFILIATE,
  COLOR_ALLY,
  COLOR_FRIEND,
  COLOR_COLD_WAR,
  COLOR_HOT_WAR,
  COLOR_ENEMY,
  COLOR_HAS_BENCH,
  COLOR_HAS_LAB,
  HEADER_SIZE,
} from '../../config/constants';
import {
  RELATION_AFFILIATES,
  RELATION_ALLIES,
  RELATION_FRIENDS,
  RELATION_COLD_WARS,
  RELATION_HOT_WARS,
  RELATION_ENEMIES,
  RELATION_HAS_BENCH,
  RELATION_HAS_LAB,
} from '../../config/strings';
import { headerColor } from '../../config/styles';

type LegendData =
  | { name: typeof RELATION_AFFILIATES; color: typeof COLOR_AFFILIATE }
  | { name: typeof RELATION_ALLIES; color: typeof COLOR_ALLY }
  | { name: typeof RELATION_FRIENDS; color: typeof COLOR_FRIEND }
  | { name: typeof RELATION_COLD_WARS; color: typeof COLOR_COLD_WAR }
  | { name: typeof RELATION_HOT_WARS; color: typeof COLOR_HOT_WAR }
  | { name: typeof RELATION_ENEMIES; color: typeof COLOR_ENEMY }
  | { name: typeof RELATION_HAS_BENCH; color: typeof COLOR_HAS_BENCH }
  | { name: typeof RELATION_HAS_LAB; color: typeof COLOR_HAS_LAB };

const legend: LegendData[] = [
  { name: RELATION_AFFILIATES, color: COLOR_AFFILIATE },
  { name: RELATION_ALLIES, color: COLOR_ALLY },
  { name: RELATION_FRIENDS, color: COLOR_FRIEND },
  { name: RELATION_COLD_WARS, color: COLOR_COLD_WAR },
  { name: RELATION_HOT_WARS, color: COLOR_HOT_WAR },
  { name: RELATION_ENEMIES, color: COLOR_ENEMY },
  { name: RELATION_HAS_BENCH, color: COLOR_HAS_BENCH },
  { name: RELATION_HAS_LAB, color: COLOR_HAS_LAB },
];

function Legend({ onMouseEnter }: DOMAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        headerColor(),
        'sticky top-0 left-0 z-40 flex origin-bottom-right items-center justify-center border border-gray-400 text-center transition-transform hover:scale-105 hover:border md:hover:scale-110'
      )}
      style={{ width: HEADER_SIZE, height: HEADER_SIZE }}
      onMouseEnter={onMouseEnter}
    >
      <ul>
        {legend.map(({ name, color }, index) => {
          return (
            <li
              key={`${index}-${name}`}
              className="flex h-2.5 items-center gap-x-1"
            >
              <span
                className={clsx('block h-2 w-4 border border-gray-900', color)}
              ></span>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Legend;
