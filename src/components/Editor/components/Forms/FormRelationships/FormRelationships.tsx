import { LABEL_TEXT_RELATIONSHIPS } from '../../../../../config/strings';
import {
  getDisplayName,
  getFaction,
  getLabelText,
  getName,
  getRelationship,
  UseFormData,
} from '../../../../../hooks';
import {
  AssociativeFactionProps,
  Relationship,
  TimestampedFactionProps,
} from '../../../../../types';
import { isEmptyArray, isNotEmptyString } from '../../../../../utils';
import FormHeader from '../FormHeader';

const orderedRelationships: Relationship[] = [
  'associates',
  'allies',
  'friends',
  'coldWars',
  'hotWars',
  'enemies',
];

export interface FormRelationshipsProps extends UseFormData {
  factions: AssociativeFactionProps;
  currentFaction: string;
}

function FormRelationships({
  state,
  handlers,
  factions,
  currentFaction,
}: FormRelationshipsProps) {
  const { handleRelationship, resetRelationship } = handlers;

  const factionIds = Object.keys(factions);

  const composeFullName = (faction: TimestampedFactionProps) => {
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
      {orderedRelationships.map((type) => {
        const relationship = getRelationship(state, type);
        return (
          <div
            key={composeDivKey(type)}
            className="flex gap-x-2 items-center px-2"
          >
            <label htmlFor={type} className="w-32 flex items-center gap-x-2">
              {getLabelText(type)}
              <button
                type="button"
                className="text-base hover:cursor-pointer"
                onClick={() => resetRelationship(type)}
                hidden={isEmptyArray(relationship)}
              >
                &#8635;
              </button>
            </label>
            <select
              name={type}
              multiple
              className="flex-1 border"
              value={relationship}
              onChange={(event) => handleRelationship(event, type)}
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
          </div>
        );
      })}
    </>
  );
}

export default FormRelationships;
