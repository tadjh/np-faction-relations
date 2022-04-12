import { MouseEventHandler, RefObject } from 'react';
import { getFaction } from '../../../../hooks';
import { Factions } from '../../../../types';
import { composeCellKey } from '../../utils';
import GridHeaderCell from '../GridHeaderCell';
import Legend from '../Legend';

export interface GridHeaderProps {
  factionIds: string[];
  factions: Factions;
  headerRefs?: RefObject<HTMLDivElement>[];
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}
function GridHeader({
  factionIds,
  factions,
  headerRefs,
  onMouseEnter: handleMouseEnter,
  onMouseLeave: handleMouseLeave,
}: GridHeaderProps) {
  return (
    <div className="contents">
      <Legend onMouseEnter={handleMouseLeave} />
      {factionIds.map((columnFactionId, columnIndex) => {
        const faction = getFaction(factions, columnFactionId);
        const padColumnIndex = columnIndex + 1;
        return (
          <GridHeaderCell
            key={composeCellKey(0, padColumnIndex)}
            rowIndex={0}
            columnIndex={padColumnIndex}
            faction={faction}
            factionId={columnFactionId}
            isRotated={true}
            onMouseEnter={handleMouseEnter}
            headerRef={headerRefs && headerRefs[padColumnIndex]}
          />
        );
      })}
    </div>
  );
}

export default GridHeader;
