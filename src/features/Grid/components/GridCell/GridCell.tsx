import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { CELL_SIZE_X, CELL_SIZE_Y } from '../../../../config/constants';
import { getBenchCount } from '../../../../hooks';
import { TimestampedFactionProps } from '../../../../types';
import { isStrictEqual, isGreaterThan } from '../../../../utils';
import { useStyles } from '../../hooks';

export interface GridCellProps {
  rowIndex: number;
  columnIndex: number;
  faction: TimestampedFactionProps;
  columnFactionId: string;
  isBottom: boolean;
  isLast: boolean;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
}

function GridCell({
  rowIndex,
  columnIndex,
  faction,
  columnFactionId,
  isBottom,
  isLast,
  handleMouseEnter,
}: GridCellProps): JSX.Element {
  const benchCount = getBenchCount(faction);
  const { backgroundColor } = useStyles();
  return (
    <div
      key={`row${rowIndex}col${columnIndex}`}
      className={clsx(
        'border text-center flex justify-center items-center relative group hover:scale-125 hover:z-10 transition-transform',
        backgroundColor({
          faction,
          columnIndex,
          rowIndex,
          columnFactionId,
        })
        // isBottom && 'border-b-gray-900',
        // isLast && 'border-r-gray-900'
      )}
    >
      <div
        data-column={columnIndex}
        className="absolute bg-gray-500 bg-opacity-5 hidden group-hover:block"
        style={{
          width: `${CELL_SIZE_X}px`,
          height: `${CELL_SIZE_Y}px`,
        }}
        onMouseEnter={handleMouseEnter}
      />
      {isStrictEqual(columnIndex, rowIndex) && isGreaterThan(benchCount, 1) && (
        <span className="text-xs text-amber-100">{benchCount}</span>
      )}
    </div>
  );
}

export default GridCell;
