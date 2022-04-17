import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { COLLECTION_FACTIONS } from '../../../../../../../../config/environment';
import { GENERIC_ERROR_TEXT } from '../../../../../../../../config/strings';
import {
  EVENT_TEXT_RESET,
  EVENT_TEXT_UPDATE,
  LABEL_TEXT_SELECT_FACTION,
  UPDATE_FACTION_IS_ERROR_TEXT,
  UPDATE_FACTION_IS_LOADING_TEXT,
  UPDATE_FACTION_IS_SUCCESS_TEXT,
} from '../../../../config/strings';

import {
  getActive,
  getFaction,
  getName,
  useApi,
  useFactions,
} from '../../../../../../../../hooks';
import {
  getErrorMessage,
  isEmptyString,
  isNotEmptyString,
} from '../../../../../../../../utils';
import Accordian from '../../../../../../../../components/Accordian';
import FormInfo from '../FormInfo';
import FormRelationships from '../FormRelationships';
import SubmitButton from '../../../../../../../../components/Inputs/SubmitButton';
import { useFormData, useSnapshot } from '../../hooks';
import toast from 'react-hot-toast';
import IconButton from '../../../../../../../../components/Inputs/IconButton';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { Factions } from '../../../../../../../../types';
import Checkbox from '../../../../../../../../components/Inputs/Checkbox';

function EditForm() {
  const { state, handlers } = useFormData();
  const { lastUpdate, factions } = useFactions();
  const [currentFaction, setCurrentFaction] = useState('');
  const { editFaction } = useApi();
  const { handleSnapshot } = useSnapshot();
  const queryClient = useQueryClient();
  let [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  let factionId = searchParams.get('factionId');

  useEffect(() => {
    if (!factionId) return;
    loadFaction(factions, factionId);
    setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factionId]);

  const mutation = useMutation(editFaction, {
    onMutate: () => {
      toast.loading(UPDATE_FACTION_IS_LOADING_TEXT, {
        id: 'edit-faction',
      });
    },
    onSuccess: () => {
      toast.success(UPDATE_FACTION_IS_SUCCESS_TEXT, {
        id: 'edit-faction',
      });
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
    onError: (error) => {
      toast.error(UPDATE_FACTION_IS_ERROR_TEXT + getErrorMessage(error), {
        id: 'edit-faction',
      });
    },
  });

  const loadFaction = (factions: Factions | null, id: string) => {
    if (!factions) return;
    const doc = factions[id];
    handlers.handleSetAll(doc);
    setCurrentFaction(id);
  };

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (event.target.value === '') return handleReset();
    const id = event.target.value;
    loadFaction(factions, id);
  };

  const handleReset = () => {
    handlers.resetState();
    setCurrentFaction('');
    mutation.reset();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (mutation.isError) return handleReset();

    handleSnapshot(factions, lastUpdate);

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
    <Accordian label="edit faction" show={isOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2 px-2 pt-4">
          <label
            htmlFor="updateFaction"
            className="flex h-8 w-32 items-center gap-x-2"
          >
            {LABEL_TEXT_SELECT_FACTION}
            <IconButton
              icon={faArrowRotateRight}
              onClick={handleReset}
              hidden={isEmptyString(currentFaction)}
            />
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
            'flex flex-col gap-y-2 transition-all',
            isNotEmptyString(currentFaction)
              ? 'max-h-[800px] overflow-auto'
              : 'max-h-0 overflow-hidden'
          )}
        >
          <FormInfo state={state} handlers={handlers} />
          <Checkbox
            name="active"
            checked={getActive(state)}
            onChange={handlers.handleActive}
            className="h-5 px-2"
          >
            show?
          </Checkbox>
          <FormRelationships
            state={state}
            handlers={handlers}
            factions={factions}
            currentFaction={currentFaction}
          />
          <div className="flex h-11 w-full items-center justify-between p-2">
            <span
              className={clsx(
                mutation.isError && 'text-red-600',
                mutation.isSuccess && 'text-green-500'
              )}
            >
              {mutation.isLoading && UPDATE_FACTION_IS_LOADING_TEXT}
              {mutation.isSuccess && UPDATE_FACTION_IS_SUCCESS_TEXT}
              {mutation.isError && GENERIC_ERROR_TEXT}
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
