import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import {
  CELL_SIZE_X,
  CELL_SIZE_Y,
  HEADER_SIZE,
} from '../../../../config/constants';
import { headerColor } from '../../../../config/styles';
import { composeShortName } from '../../../../hooks';
import { TimestampedFactionProps } from '../../../../types';

export interface GridHeaderCellProps {
  rowIndex: number;
  columnIndex: number;
  faction: TimestampedFactionProps;
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
  if (isRotated) {
    return (
      <div
        key={`row${rowIndex}col${columnIndex}`}
        className={clsx(
          'border text-center flex items-center justify-center relative group hover:scale-150 hover:z-10 hover:border-b-gray-300 hover:-translate-y-1/4 transition-transform',
          headerColor(columnIndex),
          'border-b-gray-400'
        )}
      >
        <div
          data-column={columnIndex}
          className="absolute bg-gray-500 bg-opacity-5 hidden group-hover:block"
          style={{
            width: `${CELL_SIZE_X}px`,
            height: HEADER_SIZE,
          }}
          onMouseEnter={handleMouseEnter}
        />
        <span className="-rotate-90">{composeShortName(faction)}</span>
      </div>
    );
  }

  return (
    <div
      key={`row${rowIndex}col${columnIndex}`}
      className={clsx(
        'border text-center flex items-center justify-center relative group hover:scale-150 hover:z-10 hover:border-r-gray-200 hover:-translate-x-1/4 transition-transform',
        headerColor(rowIndex),
        'border-r-gray-400'
      )}
    >
      <div
        className="absolute bg-gray-500 bg-opacity-5 hidden group-hover:block"
        style={{
          width: HEADER_SIZE,
          height: `${CELL_SIZE_Y}px`,
        }}
        onMouseEnter={handleMouseEnter}
      />
      <span>{composeShortName(faction)}</span>
    </div>
  );
}
export default GridHeaderCell;
