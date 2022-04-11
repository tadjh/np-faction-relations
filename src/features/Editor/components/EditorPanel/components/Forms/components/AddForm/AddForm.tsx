import clsx from 'clsx';
import { FormEventHandler, useRef } from 'react';
import Accordian from '../../../../../../../../components/Accordian';
import SubmitButton from '../../../../../../../../components/Inputs/SubmitButton';
import { useMutation, useQueryClient } from 'react-query';
import { useApi, useFactions } from '../../../../../../../../hooks';
import { GENERIC_ERROR_TEXT } from '../../../../../../../../config/strings';
import {
  CREATE_FACTION_IS_LOADING_TEXT,
  CREATE_FACTION_IS_SUCCESS_TEXT,
  EVENT_TEXT_ADD,
  CREATE_FACTION_IS_ERROR_TEXT,
} from '../../../../config/strings';
import { COLLECTION_FACTIONS } from '../../../../../../../../config/environment';
import {
  getErrorMessage,
  shouldCreateSnapshot,
} from '../../../../../../../../utils';
import FormInfo from '../FormInfo';
import { useFormData, useSnapshot } from '../../hooks';
import toast from 'react-hot-toast';

function AddForm() {
  const { length, lastUpdate, factions } = useFactions();
  const { state, handlers } = useFormData({ order: length });
  const { createFaction } = useApi();
  const { snapshotMutation } = useSnapshot();
  const queryClient = useQueryClient();
  const hasSumbitted = useRef(false);

  const mutation = useMutation(createFaction, {
    onMutate: () => {
      toast.loading(CREATE_FACTION_IS_LOADING_TEXT, {
        id: 'create-faction',
      });
    },
    onSuccess: () => {
      toast.success(CREATE_FACTION_IS_SUCCESS_TEXT, { id: 'create-faction' });
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
    onError: (error) => {
      toast.error(CREATE_FACTION_IS_ERROR_TEXT + getErrorMessage(error), {
        id: 'create-faction',
      });
    },
  });

  const handleReset = () => {
    if (!hasSumbitted.current) return;
    handlers.resetState();
    mutation.reset();
    hasSumbitted.current = false;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (shouldCreateSnapshot(lastUpdate)) {
      snapshotMutation.mutate(factions);
    }

    hasSumbitted.current = true;
    mutation.mutate(state);
  };

  return (
    <Accordian label="add faction">
      <form
        onSubmit={handleSubmit}
        className="gap-y-2 flex flex-col"
        onFocus={handleReset}
      >
        <FormInfo state={state} handlers={handlers} />
        <div className="w-full flex justify-between items-center p-2 h-11">
          <span
            className={clsx(
              mutation.isError && 'text-red-600',
              mutation.isSuccess && 'text-green-500'
            )}
          >
            {mutation.isLoading && CREATE_FACTION_IS_LOADING_TEXT}
            {mutation.isSuccess && CREATE_FACTION_IS_SUCCESS_TEXT}
            {mutation.isError && GENERIC_ERROR_TEXT}
          </span>
          <SubmitButton
            isLoading={mutation.isLoading}
            disabled={hasSumbitted.current}
          >
            {EVENT_TEXT_ADD}
          </SubmitButton>
        </div>
      </form>
    </Accordian>
  );
}

export default AddForm;
