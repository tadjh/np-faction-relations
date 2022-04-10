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
import { composeCellKey } from '../../utils';

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
      key={composeCellKey(rowIndex, columnIndex)}
      className={clsx(
        'border text-center flex items-center justify-center relative group',
        'hover:scale-125 hover:z-10 transition-transform',
        headerColor(isRotated ? columnIndex : rowIndex),
        isRotated
          ? 'border-b-gray-400 hover:border-b-gray-300 hover:-translate-y-1/8'
          : 'border-r-gray-400 hover:border-r-gray-200 hover:-translate-x-1/8'
      )}
    >
      <div
        data-column={isRotated ? columnIndex : null}
        className="absolute bg-gray-500 bg-opacity-5 hidden group-hover:block"
        style={{
          width: isRotated ? CELL_COLUMN_WIDTH : HEADER_SIZE,
          height: isRotated ? HEADER_SIZE : CELL_ROW_HEIGHT,
        }}
        onMouseEnter={handleMouseEnter}
      />
      <span className={clsx(isRotated && '-rotate-90')}>
        {composeShortName(faction)}
      </span>
    </div>
  );
}

export default GridHeaderCell;
