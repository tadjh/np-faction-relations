import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { COLLECTION_FACTIONS } from '../../../../../../../../config/environment';
import { GENERIC_ERROR_TEXT } from '../../../../../../../../config/strings';
import {
  EVENT_TEXT_DELETE,
  LABEL_TEXT_SELECT_FACTION,
  TEXT_IS_LOADING_DELETE,
  TEXT_IS_SUCCESS_DELETE,
} from '../../../../config/strings';
import { useApi, useFactions } from '../../../../../../../../hooks';
import {
  getErrorMessage,
  isEmptyString,
  shouldMakeHistory,
  shouldResetMutation,
} from '../../../../../../../../utils';
import Accordian from '../../../../../../../../components/Accordian';
import SubmitButton from '../../../../../../../../components/Inputs/SubmitButton';
import { toast } from 'react-toastify';
import IconButton from '../../../../../../../../components/Inputs/IconButton';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

function DeleteForm() {
  const [selected, setSelected] = useState('');
  const { deleteFaction, createHistory } = useApi();
  const { lastUpdate, factions } = useFactions();
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteFaction, {
    onSuccess: () => {
      toast.success(TEXT_IS_SUCCESS_DELETE);
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
    onError: (error) => {
      toast.error('Error deleting faction: ' + getErrorMessage(error));
    },
  });

  const mutateHistory = useMutation(createHistory, {
    onError: (error) => {
      toast.error('Error making history: ' + getErrorMessage(error));
    },
  });

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelected(event.target.value);
    if (
      shouldResetMutation(
        mutation.isSuccess,
        mutation.isError,
        mutation.isLoading
      )
    )
      mutation.reset();
  };

  const resetSelected = () => {
    setSelected('');
    if (
      shouldResetMutation(
        mutation.isSuccess,
        mutation.isError,
        mutation.isLoading
      )
    )
      mutation.reset();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (shouldMakeHistory(lastUpdate)) {
      mutateHistory.mutate(factions);
    }

    mutation.mutate(selected);
  };

  return (
    <Accordian label="delete faction">
      <form onSubmit={handleSubmit} className="gap-y-2 flex flex-col pt-4">
        <div className="flex gap-x-2 items-center px-2">
          <label
            htmlFor="deleteFaction"
            className="w-32 h-8 flex items-center gap-x-2"
          >
            {LABEL_TEXT_SELECT_FACTION}
            <IconButton
              icon={faArrowRotateRight}
              onClick={resetSelected}
              hidden={isEmptyString(selected)}
            />
          </label>
          <select
            name="deleteFaction"
            className="flex-1 border"
            value={selected}
            onChange={handleSelected}
          >
            <option key={`deleteFaction-none`} value={''}>
              {LABEL_TEXT_SELECT_FACTION}
            </option>
            {factions &&
              Object.keys(factions).map((id) => (
                <option key={`deleteFaction-${id}`} value={id}>
                  {factions[id].name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full flex justify-between items-center p-2 h-11">
          <span
            className={clsx(
              mutation.isError && 'text-red-600',
              mutation.isSuccess && 'text-green-500'
            )}
          >
            {mutation.isLoading && TEXT_IS_LOADING_DELETE}
            {mutation.isSuccess && TEXT_IS_SUCCESS_DELETE}
            {mutation.isError && GENERIC_ERROR_TEXT}
          </span>
          <SubmitButton isLoading={mutation.isLoading}>
            {EVENT_TEXT_DELETE}
          </SubmitButton>
        </div>
      </form>
    </Accordian>
  );
}

export default DeleteForm;
