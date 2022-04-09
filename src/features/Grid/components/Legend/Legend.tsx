import clsx from 'clsx';
import { DOMAttributes } from 'react';
import {
  COLOR_ASSOCIATE,
  COLOR_ALLY,
  COLOR_FRIEND,
  COLOR_COLD_WAR,
  COLOR_HOT_WAR,
  COLOR_ENEMY,
  COLOR_HAS_BENCH,
  HEADER_SIZE,
  COLOR_HAS_LAB,
} from '../../../../config/constants';
import {
  RELATION_ASSOCIATES,
  RELATION_ALLIES,
  RELATION_FRIENDS,
  RELATION_COLD_WARS,
  RELATION_HOT_WARS,
  RELATION_ENEMIES,
  RELATION_HAS_BENCH,
  RELATION_HAS_LAB,
} from '../../../../config/strings';
import { headerColor } from '../../../../config/styles';

type LegendData =
  | { name: typeof RELATION_ASSOCIATES; color: typeof COLOR_ASSOCIATE }
  | { name: typeof RELATION_ALLIES; color: typeof COLOR_ALLY }
  | { name: typeof RELATION_FRIENDS; color: typeof COLOR_FRIEND }
  | { name: typeof RELATION_COLD_WARS; color: typeof COLOR_COLD_WAR }
  | { name: typeof RELATION_HOT_WARS; color: typeof COLOR_HOT_WAR }
  | { name: typeof RELATION_ENEMIES; color: typeof COLOR_ENEMY }
  | { name: typeof RELATION_HAS_BENCH; color: typeof COLOR_HAS_BENCH }
  | { name: typeof RELATION_HAS_LAB; color: typeof COLOR_HAS_LAB };

const legend: LegendData[] = [
  { name: RELATION_ASSOCIATES, color: COLOR_ASSOCIATE },
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
        'flex justify-center items-center border-r border-b text-center border-gray-400 relative hover:scale-150 hover:z-10 hover:border transition-transform hover:-translate-x-1/4 hover:-translate-y-1/4 ',
        headerColor()
      )}
      style={{ width: HEADER_SIZE, height: HEADER_SIZE }}
      onMouseEnter={onMouseEnter}
    >
      <ul>
        {legend.map(({ name, color }, index) => {
          return (
            <li
              key={`${index}-${name}`}
              className="flex gap-x-1 items-center h-2.5"
            >
              <span
                className={clsx('block border border-gray-900 w-4 h-2', color)}
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