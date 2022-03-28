import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import FACTIONS from '../../config/factions';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';

function DeleteForm() {
  const [isFetching, setIsFetching] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelected(event.target.value);
  };

  const resetSelected: MouseEventHandler<HTMLSpanElement> = (event) => {
    setSelected('');
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsFetching(true);

    // mock api call
    const timeout: NodeJS.Timer = setTimeout(() => {
      setIsFetching(false);
      return clearTimeout(timeout);
    }, 150);
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
            id="selected"
            name="selected"
            className="flex-1 border"
            value={selected}
            onChange={handleSelected}
          >
            <option key={`selected-none`} value={''}>
              Select faction
            </option>
            {FACTIONS.map((faction) => (
              <option key={`selected-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-end items-center p-2 h-11">
          <SubmitButton isFetching={isFetching}>delete</SubmitButton>
        </div>
      </form>
    </Accordian>
  );
}

export default DeleteForm;
