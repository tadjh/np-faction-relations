import clsx from 'clsx';
import { useState } from 'react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { useMutation } from 'react-query';
import { useApi, useFactions, useFormData } from '../../hooks';
import Accordian from '../Accordian';
import FormHeader from '../FormHeader';
import CheckboxCounter from '../Inputs/CheckboxCounter';
import Counter from '../Inputs/Counter';
import Input from '../Inputs/TextInput';
import SubmitButton from '../SubmitButton';

function EditForm() {
  const { state, handlers } = useFormData();
  const { factions } = useFactions();
  const [selected, setSelected] = useState('');
  const { editFaction } = useApi();

  const mutation = useMutation(editFaction);

  const error = mutation.error as any;

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (event.target.value === '') return handleReset();
    const id = event.target.value;
    if (factions) {
      const doc = factions[id];
      doc && handlers.handleSetAll(doc);
      setSelected(id);
    }
  };

  const handleReset = () => {
    handlers.resetState();
    setSelected('');
    mutation.reset();
  };

  // TODO Debounce
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (mutation.isError) return handleReset();

    if (factions) {
      const prev = factions[selected];
      prev &&
        mutation.mutate({
          id: selected,
          next: state,
          prev: factions[selected],
          factions,
        });
    }
  };

  const handleRelationshipMap = (
    type: string,
    factionId: string,
    name: string,
    currentId: string
  ) => {
    if (factionId === currentId) return null;
    return (
      <option key={`${type}-${factionId}`} value={factionId}>
        {name}
      </option>
    );
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
                onClick={handleReset}
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
              Object.keys(factions).map((id) => (
                <option key={`selected-${id}`} value={id}>
                  {factions[id].name}
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
                Object.keys(factions).map((id) =>
                  handleRelationshipMap(
                    'associates',
                    id,
                    factions[id].name,
                    selected
                  )
                )}
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
                Object.keys(factions).map((id) =>
                  handleRelationshipMap(
                    'allies',
                    id,
                    factions[id].name,
                    selected
                  )
                )}
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
                Object.keys(factions).map((id) =>
                  handleRelationshipMap(
                    'friends',
                    id,
                    factions[id].name,
                    selected
                  )
                )}
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
                Object.keys(factions).map((id) =>
                  handleRelationshipMap(
                    'coldWar',
                    id,
                    factions[id].name,
                    selected
                  )
                )}
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
                Object.keys(factions).map((id) =>
                  handleRelationshipMap(
                    'hotWar',
                    id,
                    factions[id].name,
                    selected
                  )
                )}
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
                Object.keys(factions).map((id) =>
                  handleRelationshipMap(
                    'enemies',
                    id,
                    factions[id].name,
                    selected
                  )
                )}
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
