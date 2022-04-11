import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import {
  CELL_COLUMN_WIDTH,
  CELL_ROW_HEIGHT,
  HEADER_SIZE,
} from '../../config/constants';
import { headerColor } from '../../config/styles';
import { composeShortName } from '../../../../hooks';
import { TimestampedFaction } from '../../../../types';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../../components/Inputs/IconButton';

export interface GridHeaderCellProps {
  rowIndex: number;
  columnIndex: number;
  faction: TimestampedFaction;
  isRotated?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
}
function GridHeaderCell({
  rowIndex,
  columnIndex,
  faction,
  isRotated = false,
  onMouseEnter: handleMouseEnter,
}: GridHeaderCellProps): JSX.Element {
  return (
    <div
      className={clsx(
        'border text-center flex items-center justify-between relative group',
        'hover:scale-125 hover:z-10 transition-transform',
        headerColor(isRotated ? columnIndex : rowIndex),
        isRotated
          ? 'border-b-gray-400 hover:border-b-gray-300 hover:-translate-y-1/8 py-2 flex-col'
          : 'border-r-gray-400 hover:border-r-gray-200 hover:-translate-x-1/8 px-2 flex-row'
      )}
    >
      <div
        data-column={isRotated ? columnIndex : null}
        className={clsx(
          'absolute bg-gray-500 bg-opacity-5 hidden px-2 group-hover:block',
          isRotated ? 'top-0' : 'left-0'
        )}
        style={{
          width: isRotated ? CELL_COLUMN_WIDTH : HEADER_SIZE,
          height: isRotated ? HEADER_SIZE : CELL_ROW_HEIGHT,
        }}
        onMouseEnter={handleMouseEnter}
      />
      <div />
      <div className={clsx(isRotated && '-rotate-90')}>
        {composeShortName(faction)}
      </div>
      <IconButton
        icon={faPenToSquare}
        className="opacity-0 group-hover:opacity-100"
      />
    </div>
  );
}

export default GridHeaderCell;
