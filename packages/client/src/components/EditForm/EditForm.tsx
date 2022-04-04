import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import { useApi, useFactions, useFormData } from '../../hooks';
import Accordian from '../Accordian';
import FormHeader from '../FormHeader';
import CheckboxCounter from '../Inputs/CheckboxCounter';
import Counter from '../Inputs/Counter';
import Input from '../Inputs/TextInput';
import SubmitButton from '../SubmitButton';

function EditForm() {
  const [selected, setSelected] = useState('');
  const { state, handlers } = useFormData();
  const { factions } = useFactions();
  const { editFaction } = useApi();

  const mutation = useMutation(editFaction);

  const error = mutation.error as any;

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelected(event.target.value);

    if (factions) {
      const doc = factions.find((doc) => doc.id === event.target.value);
      doc && handlers.handleSetAll(doc);
    }
  };

  const resetSelected = () => setSelected('');

  // TODO Debounce
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (mutation.isError) {
      handlers.resetState();
      resetSelected();
      return mutation.reset();
    }

    mutation.mutate(state);
  };

  return (
    <Accordian label="edit faction">
      <form onSubmit={handleSubmit} className="gap-y-2 flex flex-col">
        <div className="flex gap-x-2 items-center px-2 pt-4">
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
        <div
          className={clsx(
            'flex flex-col gap-y-2',
            selected !== ''
              ? 'max-h-[800px] overflow-auto'
              : 'max-h-0 overflow-hidden',
            'transition-all'
          )}
        >
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
          <FormHeader>relationships</FormHeader>
          <div className="flex gap-x-2 items-center px-2">
            <label
              htmlFor="associates"
              className="w-32 flex items-center gap-x-2"
            >
              associates
              {state.relationships.associates.data.length !== 0 && (
                <span
                  className="text-base hover:cursor-pointer"
                  onClick={handlers.resetAssociates}
                >
                  &#8635;
                </span>
              )}
            </label>
            <select
              name="associates"
              multiple
              className="flex-1 border"
              value={state.relationships.associates.data}
              onChange={handlers.handleAssociates}
            >
              {factions &&
                factions.map((faction) => (
                  <option key={`associates-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-x-2 items-center px-2">
            <label htmlFor="allies" className="w-32 flex items-center gap-x-2">
              allies
              {state.relationships.allies.data.length !== 0 && (
                <span
                  className="text-base hover:cursor-pointer"
                  onClick={handlers.resetAllies}
                >
                  &#8635;
                </span>
              )}
            </label>
            <select
              name="allies"
              multiple
              className="flex-1 border"
              value={state.relationships.allies.data}
              onChange={handlers.handleAllies}
            >
              {factions &&
                factions.map((faction) => (
                  <option key={`allies-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-x-2 items-center px-2">
            <label htmlFor="friends" className="w-32 flex items-center gap-x-2">
              friends
              {state.relationships.friends.data.length !== 0 && (
                <span
                  className="text-base hover:cursor-pointer"
                  onClick={handlers.resetFriends}
                >
                  &#8635;
                </span>
              )}
            </label>
            <select
              name="friends"
              multiple
              className="flex-1 border"
              value={state.relationships.friends.data}
              onChange={handlers.handleFriends}
            >
              {factions &&
                factions.map((faction) => (
                  <option key={`friends-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-x-2 items-center px-2">
            <label htmlFor="hotWar" className="w-32 flex items-center gap-x-2">
              hot war
              {state.relationships.hotWar.data.length !== 0 && (
                <span
                  className="text-base hover:cursor-pointer"
                  onClick={handlers.resetHotWar}
                >
                  &#8635;
                </span>
              )}
            </label>
            <select
              name="hotWar"
              multiple
              className="flex-1 border"
              value={state.relationships.hotWar.data}
              onChange={handlers.handleHotWar}
            >
              {factions &&
                factions.map((faction) => (
                  <option key={`hotWar-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-x-2 items-center px-2">
            <label htmlFor="coldWar" className="w-32 flex items-center gap-x-2">
              cold war
              {state.relationships.coldWar.data.length !== 0 && (
                <span
                  className="text-base hover:cursor-pointer"
                  onClick={handlers.resetColdWar}
                >
                  &#8635;
                </span>
              )}
            </label>
            <select
              name="coldWar"
              multiple
              className="flex-1 border"
              value={state.relationships.coldWar.data}
              onChange={handlers.handleColdWar}
            >
              {factions &&
                factions.map((faction) => (
                  <option key={`coldWar-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-x-2 items-center px-2">
            <label htmlFor="enemies" className="w-32 flex items-center gap-x-2">
              enemies
              {state.relationships.enemies.data.length !== 0 && (
                <span
                  className="text-base hover:cursor-pointer"
                  onClick={handlers.resetEnemies}
                >
                  &#8635;
                </span>
              )}
            </label>
            <select
              name="enemies"
              multiple
              className="flex-1 border"
              value={state.relationships.enemies.data}
              onChange={handlers.handleEnemies}
            >
              {factions &&
                factions.map((faction) => (
                  <option key={`enemies-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full flex justify-between items-center p-2 h-11">
            <span className={clsx(mutation.isError && 'text-red-600')}>
              {mutation.isLoading && 'updating faction...'}
              {mutation.isError && `${error.response.data.message}`}
              {mutation.isSuccess && 'faction updated'}
            </span>
            <SubmitButton isFetching={mutation.isLoading}>
              {mutation.isError ? 'reset' : 'save'}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Accordian>
  );
}

export default EditForm;
