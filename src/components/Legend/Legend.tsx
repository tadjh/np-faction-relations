import clsx from 'clsx';
import {
  COLOR_ASSOCIATE,
  COLOR_ALLY,
  COLOR_FRIEND,
  COLOR_COLD_WAR,
  COLOR_HOT_WAR,
  COLOR_ENEMY,
  RELATION_ASSOCIATES,
  RELATION_ALLIES,
  RELATION_FRIENDS,
  RELATION_COLD_WAR,
  RELATION_HOT_WAR,
  RELATION_ENEMIES,
  COLOR_HAS_BENCH,
  RELATION_HAS_BENCH,
  HEADER_SIZE,
} from '../../config/constants';
import { headerColor } from '../../config/styles';

function Legend() {
  return (
    <div
      className={clsx(
        'flex justify-center items-center border text-center border-stone-900',
        headerColor()
      )}
      style={{ width: HEADER_SIZE, height: HEADER_SIZE }}
    >
      <ul>
        <li className="flex gap-x-1 items-center">
          <span
            className={clsx(
              'block border border-stone-900 w-4 h-2',
              COLOR_ASSOCIATE
            )}
          ></span>
          {RELATION_ASSOCIATES}
        </li>
        <li className="flex gap-x-1 items-center">
          <span
            className={clsx(
              'block border border-stone-900 w-4 h-2',
              COLOR_ALLY
            )}
          ></span>
          {RELATION_ALLIES}
        </li>
        <li className="flex gap-x-1 items-center">
          <span
            className={clsx(
              'block border border-stone-900 w-4 h-2',
              COLOR_FRIEND
            )}
          ></span>
          {RELATION_FRIENDS}
        </li>
        <li className="flex gap-x-1 items-center">
          <span
            className={clsx(
              'block border border-stone-900 w-4 h-2',
              COLOR_COLD_WAR
            )}
          ></span>
          {RELATION_COLD_WAR}
        </li>
        <li className="flex gap-x-1 items-center">
          <span
            className={clsx(
              'block border border-stone-900 w-4 h-2',
              COLOR_HOT_WAR
            )}
          ></span>
          {RELATION_HOT_WAR}
        </li>
        <li className="flex gap-x-1 items-center">
          <span
            className={clsx(
              'block border border-stone-900 w-4 h-2',
              COLOR_ENEMY
            )}
          ></span>
          {RELATION_ENEMIES}
        </li>
        <li className="flex gap-x-1 items-center">
          <span
            className={clsx(
              'block border border-stone-900 w-4 h-2',
              COLOR_HAS_BENCH
            )}
          ></span>
          {RELATION_HAS_BENCH}
        </li>
      </ul>
    </div>
  );
}

export default Legend;
