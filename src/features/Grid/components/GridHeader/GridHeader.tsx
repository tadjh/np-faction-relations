import { MouseEventHandler } from 'react';
import { getFaction } from '../../../../hooks';
import { Factions } from '../../../../types';
import GridHeaderCell from '../GridHeaderCell';
import Legend from '../Legend';

export interface GridHeaderProps {
  factionIds: string[];
  factions: Factions;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}
function GridHeader({
  factionIds,
  factions,
  onMouseEnter: handleMouseEnter,
  onMouseLeave: handleMouseLeave,
}: GridHeaderProps) {
  return (
    <div className="contents">
      <Legend onMouseEnter={handleMouseLeave} />
      {factionIds.map((columnFaction, columnIndex) => {
        const faction = getFaction(factions, columnFaction);
        const padColumnIndex = columnIndex + 1;
        return (
          <GridHeaderCell
            rowIndex={0}
            columnIndex={padColumnIndex}
            faction={faction}
            isRotated={true}
            onMouseEnter={handleMouseEnter}
          />
        );
      })}
    </div>
  );
}

export default GridHeader;
