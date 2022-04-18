import { RefObject } from 'react';
import { composeIndexKey } from '../../../../utils/compose';
import { composeGridColumns } from '../../utils/compose';

export interface GridOverlayProps {
  factionIds: string[];
  columnRefs: RefObject<HTMLDivElement>[];
}

function GridOverlay({ factionIds, columnRefs }: GridOverlayProps) {
  return (
    <div
      className="absolute grid h-full w-full"
      style={{
        gridTemplateColumns: composeGridColumns(factionIds.length),
      }}
    >
      <div />
      {factionIds.map((_, columnIndex) => {
        const padColumnIndex = columnIndex + 1;
        return (
          <div
            key={composeIndexKey('column-overlay', padColumnIndex)}
            ref={columnRefs[padColumnIndex]}
            data-column={padColumnIndex}
            className="pointer-events-none bg-gray-500 bg-opacity-5"
            style={{ opacity: 0 }}
          />
        );
      })}
    </div>
  );
}

export default GridOverlay;
