import { RefObject } from 'react';
import { HEADER_SIZE, CELL_SIZE_X } from '../../../../config/constants';

export interface GridOverlayProps {
  length: number;
  factionIds: string[];
  columnRefs: RefObject<HTMLDivElement>[];
}

function GridOverlay({ length, factionIds, columnRefs }: GridOverlayProps) {
  return (
    <div
      className="absolute w-full h-full grid"
      style={{
        gridTemplateColumns: `${HEADER_SIZE} repeat(${length},${CELL_SIZE_X}px)`,
      }}
    >
      <div />
      {factionIds.map((_, columnIndex) => {
        const padColumnIndex = columnIndex + 1;
        return (
          <div
            key={`column-overlay-${padColumnIndex}`}
            ref={columnRefs[padColumnIndex]}
            data-column={padColumnIndex}
            className="bg-gray-500 bg-opacity-5 pointer-events-none"
            style={{ opacity: 0 }}
          />
        );
      })}
    </div>
  );
}

export default GridOverlay;
