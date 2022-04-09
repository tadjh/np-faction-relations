import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { COLLECTION_FACTIONS } from '../../../../../../../config/environment';
import {
  EVENT_TEXT_DELETE,
  LABEL_TEXT_SELECT_FACTION,
  TEXT_IS_LOADING_DELETE,
  TEXT_IS_SUCCESS_DELETE,
} from '../../../../../../../config/strings';
import { useApi, useFactions } from '../../../../../../../hooks';
import {
  getErrorMessage,
  shouldResetMutation,
} from '../../../../../../../utils';
import Accordian from '../../../../../../Accordian';
import SubmitButton from '../../../../../../Inputs/SubmitButton';

function DeleteForm() {
  const [selected, setSelected] = useState('');
  const { deleteFaction } = useApi();
  const { factions } = useFactions();
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteFaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
  });

  const error = mutation.error as any;

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
            {selected !== '' && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={resetSelected}
              >
                &#8635;
              </span>
            )}
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
            {mutation.isError && `${getErrorMessage(error)}`}
            {mutation.isSuccess && TEXT_IS_SUCCESS_DELETE}
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
