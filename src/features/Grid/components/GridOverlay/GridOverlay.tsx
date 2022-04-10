import { RefObject } from 'react';
import { HEADER_SIZE, CELL_COLUMN_WIDTH } from '../../config/constants';

export interface GridOverlayProps {
  factionIds: string[];
  columnRefs: RefObject<HTMLDivElement>[];
}

function GridOverlay({ factionIds, columnRefs }: GridOverlayProps) {
  return (
    <div
      className="absolute w-full h-full grid"
      style={{
        gridTemplateColumns: `${HEADER_SIZE} repeat(${factionIds.length},${CELL_COLUMN_WIDTH})`,
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
