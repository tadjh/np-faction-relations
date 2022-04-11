import { LABEL_TEXT_RELATIONSHIPS } from '../../../../config/strings';
import {
  getDisplayName,
  getFaction,
  getLabelText,
  getName,
  getRelationship,
} from '../../../../../../../../hooks';
import {
  Factions,
  Relationship,
  TimestampedFaction,
} from '../../../../../../../../types';
import { isNotEmptyString } from '../../../../../../../../utils';
import FormHeader from '../FormHeader';
import { UseFormData } from '../../hooks';
import { useMemo, useState } from 'react';
import IconButton from '../../../../../../../../components/Inputs/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const orderedRelationships: Relationship[] = [
  'associates',
  'allies',
  'friends',
  'coldWars',
  'hotWars',
  'enemies',
];

export interface FormRelationshipsProps extends UseFormData {
  factions: Factions;
  currentFaction: string;
}

function FormRelationships({
  state,
  handlers,
  factions,
  currentFaction,
}: FormRelationshipsProps) {
  const { handleRelationship } = handlers;
  const [selected, setSelected] = useState(-1);

  const resetSelected = () => setSelected(-1);

  const handleSelected = (currentIndex: number) => {
    if (currentIndex === selected) return resetSelected();
    setSelected(currentIndex);
  };

  const factionIds = useMemo(() => Object.keys(factions), [factions]);

  const composeFullName = (faction: TimestampedFaction) => {
    const name = getName(faction);
    const displayName = getDisplayName(faction);
    if (isNotEmptyString(displayName)) return `${name} [${displayName}]`;
    return name;
  };

  const composeDivKey = (type: Relationship) => {
    return `relations-${type}`;
  };

  const composeOptionKey = (type: Relationship, factionId: string) => {
    return `${type}-${factionId}`;
  };

  return (
    <>
      <FormHeader>{LABEL_TEXT_RELATIONSHIPS}</FormHeader>
      <div className="flex flex-row px-2 gap-x-2">
        <div className="flex flex-col gap-y-2">
          {orderedRelationships.map((type, index) => {
            const relationship = getRelationship(state, type);
            return (
              <label
                key={composeDivKey(type)}
                htmlFor={type}
                onClick={() => handleSelected(index)}
                className={clsx(
                  'flex items-center gap-x-2 cursor-pointer',
                  selected !== -1 && selected !== index && 'text-gray-400'
                )}
              >
                {relationship.length > 0 && <span>{relationship.length}</span>}
                {getLabelText(type)}
                <IconButton icon={faPlus} />
              </label>
            );
          })}
        </div>
        <div className="flex-1">
          {orderedRelationships.map((type, index) => {
            const relationship = getRelationship(state, type);
            return (
              <select
                name={type}
                multiple
                className="border w-full h-full"
                value={relationship}
                onChange={(event) => handleRelationship(event, type)}
                hidden={selected !== index}
              >
                {factionIds.map((factionId) => {
                  if (factionId === currentFaction) return null;
                  const faction = getFaction(factions, factionId);
                  return (
                    <option
                      key={composeOptionKey(type, factionId)}
                      value={factionId}
                    >
                      {composeFullName(faction)}
                    </option>
                  );
                })}
              </select>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FormRelationships;
