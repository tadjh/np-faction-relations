import clsx from 'clsx';
import { FormEventHandler } from 'react';
import Accordian from '../../../../../../../../components/Accordian';
import SubmitButton from '../../../../../../../../components/Inputs/SubmitButton';
import { useMutation, useQueryClient } from 'react-query';
import { useApi, useFactions } from '../../../../../../../../hooks';
import {
  TEXT_IS_LOADING_ADD,
  TEXT_IS_SUCCESS_ADD,
  EVENT_TEXT_RESET,
  EVENT_TEXT_ADD,
} from '../../../../../../../../config/strings';
import { COLLECTION_FACTIONS } from '../../../../../../../../config/environment';
import {
  getErrorMessage,
  shouldResetMutation,
} from '../../../../../../../../utils';
import FormInfo from '../FormInfo';
import { useFormData } from '../../hooks';
import { toast } from 'react-toastify';

function AddForm() {
  const { length } = useFactions();
  const { state, handlers } = useFormData({ order: length });
  const { createFaction } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation(createFaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
  });

  const error = mutation.error as any;

  const reset = () => {
    handlers.resetState();
    mutation.reset();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (shouldResetMutation(mutation.isSuccess, mutation.isError))
      return reset();

    mutation.mutate(state);
  };

  return (
    <Accordian label="add faction">
      <form onSubmit={handleSubmit} className="gap-y-2 flex flex-col">
        <FormInfo state={state} handlers={handlers} />
        <div className="w-full flex justify-between items-center p-2 h-11">
          <span
            className={clsx(
              mutation.isError && 'text-red-600',
              mutation.isSuccess && 'text-green-500'
            )}
          >
            {mutation.isLoading && toast.info(TEXT_IS_LOADING_ADD)}
            {mutation.isSuccess && toast.success(TEXT_IS_SUCCESS_ADD)}
            {mutation.isError && toast.error(`${getErrorMessage(error)}`)}
          </span>
          <SubmitButton isLoading={mutation.isLoading}>
            {mutation.isSuccess || mutation.isError
              ? EVENT_TEXT_RESET
              : EVENT_TEXT_ADD}
          </SubmitButton>
        </div>
      </form>
    </Accordian>
  );
}

export default AddForm;