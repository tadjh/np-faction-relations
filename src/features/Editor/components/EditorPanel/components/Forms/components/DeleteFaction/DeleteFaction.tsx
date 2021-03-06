import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { COLLECTION_FACTIONS } from '../../../../../../../../config/environment';
import { GENERIC_ERROR_TEXT } from '../../../../../../../../config/strings';
import {
  EVENT_TEXT_DELETE,
  LABEL_TEXT_SELECT_FACTION,
  DELETE_FACTION_IS_LOADING_TEXT,
  DELETE_FACTION_IS_SUCCESS_TEXT,
  DELETE_FACTION_IS_ERROR_TEXT,
} from '../../../../config/strings';
import { useApi, useFactions } from '../../../../../../../../hooks';
import {
  getErrorMessage,
  shouldResetMutation,
} from '../../../../../../../../utils';
import Accordian from '../../../../../../../../components/Accordian';
import SubmitButton from '../../../../../../../../components/Inputs/SubmitButton';
import toast from 'react-hot-toast';
import { useSnapshot } from '../../hooks';
import { composeOptionKey } from '../../../../../../../../utils/compose';

function DeleteForm() {
  const [selected, setSelected] = useState('');
  const { deleteFaction } = useApi();
  const { factions, lastUpdate } = useFactions();
  const { handleSnapshot } = useSnapshot(factions, lastUpdate);
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteFaction, {
    onMutate: () => {
      toast.loading(DELETE_FACTION_IS_LOADING_TEXT, {
        id: 'delete-faction',
      });
    },
    onSuccess: () => {
      toast.success(DELETE_FACTION_IS_SUCCESS_TEXT, {
        id: 'delete-faction',
      });
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
    onError: (error) => {
      toast.error(DELETE_FACTION_IS_ERROR_TEXT + getErrorMessage(error), {
        id: 'delete-faction',
      });
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    handleSnapshot();

    mutation.mutate(selected);
  };

  return (
    <Accordian label="delete faction">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 pt-4">
        <div className="flex items-center gap-x-2 px-2">
          <label
            htmlFor="deleteFaction"
            className="flex h-8 w-1/3 items-center gap-x-2"
          >
            {LABEL_TEXT_SELECT_FACTION}
          </label>
          <select
            name="deleteFaction"
            className="flex-1 border"
            value={selected}
            onChange={handleSelected}
          >
            <option key="delete-faction-none" value={''}>
              {LABEL_TEXT_SELECT_FACTION}
            </option>
            {factions &&
              Object.keys(factions).map((factionId) => (
                <option
                  key={composeOptionKey('delete-faction', factionId)}
                  value={factionId}
                >
                  {factions[factionId].name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex h-11 w-full items-center justify-between p-2">
          <span
            className={clsx(
              mutation.isError && 'text-red-600',
              mutation.isSuccess && 'text-green-500'
            )}
          >
            {mutation.isLoading && DELETE_FACTION_IS_LOADING_TEXT}
            {mutation.isSuccess && DELETE_FACTION_IS_SUCCESS_TEXT}
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
