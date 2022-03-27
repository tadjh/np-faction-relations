import { HTMLAttributes } from 'react';
import { CELL_SIZE_X, CELL_SIZE_Y, HEADER_SIZE } from '../../config/constants';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
}

function Grid({ size, children }: GridProps) {
  return (
    <div
      className="grid relative text-[8px]"
      style={{
        gridTemplateColumns: `${HEADER_SIZE}px repeat(${size},${CELL_SIZE_X}px)`,
        gridTemplateRows: `${HEADER_SIZE}px repeat(${size},${CELL_SIZE_Y}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default Grid;
