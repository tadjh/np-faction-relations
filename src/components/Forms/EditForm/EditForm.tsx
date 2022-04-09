import clsx from 'clsx';
import { useState } from 'react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { COLLECTION_FACTIONS } from '../../../config/environment';
import {
  EVENT_TEXT_RESET,
  EVENT_TEXT_UPDATE,
  LABEL_TEXT_SELECT_FACTION,
  TEXT_IS_LOADING_UPDATE,
  TEXT_IS_SUCCESS_UPDATE,
} from '../../../config/strings';
import {
  getFaction,
  getName,
  useApi,
  useFactions,
  useFormData,
} from '../../../hooks';
import { getErrorMessage, isNotEmptyString } from '../../../utils';
import Accordian from '../../Accordian';
import FormInfo from '../FormInfo';
import FormRelationships from '../FormRelationships';
import SubmitButton from '../../SubmitButton';

function EditForm() {
  const { state, handlers } = useFormData();
  const { factions } = useFactions();
  const [currentFaction, setCurrentFaction] = useState('');
  const { editFaction } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation(editFaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
  });

  const error = mutation.error as any;

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (event.target.value === '') return handleReset();
    const id = event.target.value;
    if (factions) {
      const doc = factions[id];
      handlers.handleSetAll(doc);
      setCurrentFaction(id);
    }
  };

  const handleReset = () => {
    handlers.resetState();
    setCurrentFaction('');
    mutation.reset();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (mutation.isError) return handleReset();

    if (factions) {
      const prev = factions[currentFaction];
      prev &&
        mutation.mutate({
          id: currentFaction,
          next: state,
          prev: factions[currentFaction],
          factions,
        });
    }
  };

  if (!factions) return null;

  return (
    <Accordian label="edit faction">
      <form onSubmit={handleSubmit} className="gap-y-2 flex flex-col">
        <div className="flex gap-x-2 items-center px-2 pt-4">
          <label
            htmlFor="updateFaction"
            className="w-32 h-8 flex items-center gap-x-2"
          >
            {LABEL_TEXT_SELECT_FACTION}
            {isNotEmptyString(currentFaction) && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={handleReset}
              >
                &#8635;
              </span>
            )}
          </label>
          <select
            name="updateFaction"
            className="flex-1 border"
            value={currentFaction}
            onChange={handleSelected}
          >
            <option key="updateFaction-none" value={''}>
              {LABEL_TEXT_SELECT_FACTION}
            </option>
            {Object.keys(factions).map((factionId) => {
              const faction = getFaction(factions, factionId);
              return (
                <option key={`updateFaction-${factionId}`} value={factionId}>
                  {getName(faction)}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className={clsx(
            'flex flex-col gap-y-2',
            isNotEmptyString(currentFaction)
              ? 'max-h-[800px] overflow-auto'
              : 'max-h-0 overflow-hidden',
            'transition-all'
          )}
        >
          <FormInfo state={state} handlers={handlers} />
          <FormRelationships
            state={state}
            handlers={handlers}
            factions={factions}
            currentFaction={currentFaction}
          />
          <div className="w-full flex justify-between items-center p-2 h-11">
            <span
              className={clsx(
                mutation.isError && 'text-red-600',
                mutation.isSuccess && 'text-green-500'
              )}
            >
              {mutation.isLoading && TEXT_IS_LOADING_UPDATE}
              {mutation.isError && `${getErrorMessage(error)}`}
              {mutation.isSuccess && TEXT_IS_SUCCESS_UPDATE}
            </span>
            <SubmitButton isLoading={mutation.isLoading}>
              {mutation.isError ? EVENT_TEXT_RESET : EVENT_TEXT_UPDATE}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Accordian>
  );
}

export default EditForm;
