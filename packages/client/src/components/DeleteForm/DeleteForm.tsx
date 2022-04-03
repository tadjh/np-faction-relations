import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import { useApi, useFactions } from '../../hooks';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';

function DeleteForm() {
  const [selected, setSelected] = useState('');
  const { deleteFaction } = useApi();
  const { factions } = useFactions();

  const mutation = useMutation(deleteFaction);

  const error = mutation.error as any;

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelected(event.target.value);
    if (mutation.isSuccess || mutation.isError || mutation.isLoading)
      mutation.reset();
  };

  const resetSelected = () => {
    setSelected('');
    if (mutation.isSuccess || mutation.isError || mutation.isLoading)
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
            htmlFor="selected"
            className="w-32 h-8 flex items-center gap-x-2"
          >
            select faction
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
            name="selected"
            className="flex-1 border"
            value={selected}
            onChange={handleSelected}
          >
            <option key={`selected-none`} value={''}>
              select faction
            </option>
            {factions &&
              factions.map((faction) => (
                <option key={`selected-${faction.id}`} value={faction.id}>
                  {faction.name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full flex justify-between items-center p-2 h-11">
          <span className={clsx(mutation.isError && 'text-red-600')}>
            {mutation.isLoading && 'removing faction...'}
            {mutation.isError && `${error.response.data.message}`}
            {mutation.isSuccess && 'faction removed'}
          </span>
          <SubmitButton isFetching={mutation.isLoading}>delete</SubmitButton>
        </div>
      </form>
    </Accordian>
  );
}

export default DeleteForm;
