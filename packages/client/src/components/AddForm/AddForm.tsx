import clsx from 'clsx';
import { FormEventHandler } from 'react';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';
import { useMutation } from 'react-query';
import { useApi, useFormData } from '../../hooks';
import Input from '../Inputs/TextInput';
import FormHeader from '../FormHeader';
import CheckboxCounter from '../Inputs/CheckboxCounter';
import Counter from '../Inputs/Counter';

function AddForm() {
  const { state, handlers } = useFormData();
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
        <FormHeader>info</FormHeader>
        <Input
          name="name"
          type="text"
          value={state.name}
          onChange={handlers.handleName}
        >
          name
        </Input>
        <Input
          name="displayName"
          type="text"
          value={state.displayName}
          onChange={handlers.handleDisplayName}
        >
          display name <span className="text-[8px]">optional</span>
        </Input>
        <CheckboxCounter
          name="hasBench"
          label="has bench?"
          checked={state.attributes.hasBench}
          onChange={handlers.handleHasBench}
          countLabel="number of benches"
          count={state.attributes.benchCount}
          onChangeCount={handlers.handleBenchCount}
        />
        <CheckboxCounter
          name="hasLab"
          label="has lab?"
          checked={state.attributes.hasLab}
          onChange={handlers.handleHasLab}
          countLabel="number of labs"
          count={state.attributes.labCount}
          onChangeCount={handlers.handleLabCount}
        />
        <Counter
          name="order"
          min={0}
          value={state.order}
          onChange={handlers.handleOrder}
        >
          sort order
        </Counter>
        <div className="w-full flex justify-between items-center p-2 h-11">
          <span className={clsx(mutation.isError && 'text-red-600')}>
            {mutation.isLoading && 'adding faction...'}
            {mutation.isError && `${error.response.data.message}`}
            {mutation.isSuccess && 'faction added'}
          </span>
          <SubmitButton isFetching={mutation.isLoading}>
            {mutation.isSuccess || mutation.isError ? 'reset' : 'save'}
          </SubmitButton>
        </div>
      </form>
    </Accordian>
  );
}

export default AddForm;
