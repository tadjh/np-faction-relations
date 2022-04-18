import { LABEL_TEXT_RELATIONSHIPS } from '../../../../config/strings';
import {
  composeFullName,
  getFaction,
  getLabelText,
  getRelationship,
} from '../../../../../../../../hooks';
import { Factions, Relationship } from '../../../../../../../../types';
import FormHeader from '../FormHeader';
import { UseFormData } from '../../hooks';
import { useMemo, useState } from 'react';
import IconButton from '../../../../../../../../components/Inputs/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import {
  composeLabelKey,
  composeOptionKey,
  composeSelectKey,
} from '../../../../../../../../utils/compose';

const orderedRelationships: Relationship[] = [
  'affiliates',
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

  return (
    <>
      <FormHeader>{LABEL_TEXT_RELATIONSHIPS}</FormHeader>
      <div className="flex flex-row gap-x-2 px-2">
        <div className="flex flex-col gap-y-2">
          {orderedRelationships.map((type, index) => {
            const relationship = getRelationship(state, type);
            return (
              <label
                key={composeLabelKey('relationship', type)}
                htmlFor={type}
                onClick={() => handleSelected(index)}
                className={clsx(
                  'flex cursor-pointer items-center justify-between gap-x-1',
                  selected !== -1 && selected !== index && 'text-gray-400'
                )}
              >
                <div className="flex w-24 gap-x-1">
                  <span
                    className={clsx(
                      'transition-all',
                      relationship.length > 0
                        ? 'w-auto bg-gray-200 px-1 opacity-100'
                        : 'w-0 opacity-0'
                    )}
                  >
                    {relationship.length > 0 && relationship.length}
                  </span>
                  {getLabelText(type)}
                </div>
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
                key={composeSelectKey('relationship', type)}
                name={type}
                multiple
                className="h-full w-full border"
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
