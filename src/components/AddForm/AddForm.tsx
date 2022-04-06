import clsx from 'clsx';
import { FormEventHandler } from 'react';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';
import { useMutation } from 'react-query';
import { useApi, useFactions, useFormData } from '../../hooks';
import Input from '../Inputs/TextInput';
import FormHeader from '../FormHeader';
import CheckboxCounter from '../Inputs/CheckboxCounter';
import Counter from '../Inputs/Counter';
import {
  LABEL_TEXT_DISPLAY_NAME,
  LABEL_TEXT_INFO,
  TEXT_IS_LOADING_ADD,
  TEXT_IS_SUCCESS_ADD,
  LABEL_TEXT_NAME,
  LABEL_TEXT_OPTIONAL,
  EVENT_TEXT_RESET,
  LABEL_TEXT_SORT_ORDER,
  LABEL_TEXT_HAS_BENCH,
  LABEL_TEXT_LAB_COUNT,
  LABEL_TEXT_BENCH_COUNT,
  LABEL_TEXT_HAS_LAB,
  EVENT_TEXT_ADD,
} from '../../config/strings';

function AddForm() {
  const { length } = useFactions();
  const { state, handlers } = useFormData({ order: length });
  const { createFaction } = useApi();

  const mutation = useMutation(createFaction);

  const error = mutation.error as any;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (mutation.isSuccess || mutation.isError) {
      handlers.resetState();
      return mutation.reset();
    }

    mutation.mutate(state);
  };

  return (
    <Accordian label="add faction">
      <form onSubmit={handleSubmit} className="gap-y-2 flex flex-col">
        <FormHeader>{LABEL_TEXT_INFO}</FormHeader>
        <Input
          name={LABEL_TEXT_NAME}
          type="text"
          value={state.name}
          onChange={handlers.handleName}
        >
          {LABEL_TEXT_NAME}
        </Input>
        <Input
          name="displayName"
          type="text"
          value={state.displayName}
          onChange={handlers.handleDisplayName}
        >
          {LABEL_TEXT_DISPLAY_NAME}{' '}
          <span className="text-[8px]">{LABEL_TEXT_OPTIONAL}</span>
        </Input>
        <CheckboxCounter
          name="hasBench"
          label={LABEL_TEXT_HAS_BENCH}
          checked={state.attributes.hasBench}
          onChange={handlers.handleHasBench}
          countLabel={LABEL_TEXT_BENCH_COUNT}
          count={state.attributes.benchCount}
          onChangeCount={handlers.handleBenchCount}
        />
        <CheckboxCounter
          name="hasLab"
          label={LABEL_TEXT_HAS_LAB}
          checked={state.attributes.hasLab}
          onChange={handlers.handleHasLab}
          countLabel={LABEL_TEXT_LAB_COUNT}
          count={state.attributes.labCount}
          onChangeCount={handlers.handleLabCount}
        />
        <Counter
          name="sortOrder"
          min={0}
          value={state.order}
          onChange={handlers.handleOrder}
        >
          {LABEL_TEXT_SORT_ORDER}
        </Counter>
        <div className="w-full flex justify-between items-center p-2 h-11">
          <span className={clsx(mutation.isError && 'text-red-600')}>
            {mutation.isLoading && TEXT_IS_LOADING_ADD}
            {mutation.isError && `${error.response.data.message}`}
            {mutation.isSuccess && TEXT_IS_SUCCESS_ADD}
          </span>
          <SubmitButton isFetching={mutation.isLoading}>
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
