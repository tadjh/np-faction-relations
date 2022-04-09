import { MouseEventHandler } from 'react';
import { getFaction } from '../../../../hooks';
import { AssociativeFactionProps } from '../../../../types';
import { isStrictEqual } from '../../../../utils';
import GridHeaderCell from '../GridHeaderCell';
import Legend from '../Legend';

export interface GridHeaderProps {
  factionIds: string[];
  factions: AssociativeFactionProps;
  length: number;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}
function GridHeader({
  factionIds,
  factions,
  length,
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
            isLast={isStrictEqual(padColumnIndex, length)}
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
