import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { CELL_COLUMN_WIDTH, CELL_ROW_HEIGHT } from '../../config/constants';
import { getBenchCount } from '../../../../hooks';
import { TimestampedFaction } from '../../../../types';
import { isStrictEqual, isGreaterThan } from '../../../../utils';
import { useStyles } from '../../hooks';
import { composeCellKey } from '../../utils';

export interface GridCellProps {
  rowIndex: number;
  columnIndex: number;
  faction: TimestampedFaction;
  columnFactionId: string;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
}

function GridCell({
  rowIndex,
  columnIndex,
  faction,
  columnFactionId,
  handleMouseEnter,
}: GridCellProps): JSX.Element {
  const benchCount = getBenchCount(faction);
  const { backgroundColor } = useStyles();
  return (
    <div
      key={composeCellKey(rowIndex, columnIndex)}
      className={clsx(
        'group relative flex items-center justify-center border text-center transition-transform hover:z-10 hover:scale-125',
        backgroundColor({
          faction,
          columnIndex,
          rowIndex,
          columnFactionId,
        })
      )}
    >
      <div
        data-column={columnIndex}
        className="absolute hidden bg-gray-500 bg-opacity-5 group-hover:block"
        style={{
          width: CELL_COLUMN_WIDTH,
          height: CELL_ROW_HEIGHT,
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
