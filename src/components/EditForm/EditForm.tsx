import clsx from 'clsx';
import { useState } from 'react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { COLLECTION_FACTIONS } from '../../config/environment';
import {
  EVENT_TEXT_RESET,
  EVENT_TEXT_UPDATE,
  LABEL_TEXT_ALLIES,
  LABEL_TEXT_ASSOCIATES,
  LABEL_TEXT_BENCH_COUNT,
  LABEL_TEXT_COLD_WAR,
  LABEL_TEXT_DISPLAY_NAME,
  LABEL_TEXT_ENEMIES,
  LABEL_TEXT_FRIENDS,
  LABEL_TEXT_HAS_BENCH,
  LABEL_TEXT_HAS_LAB,
  LABEL_TEXT_HOT_WAR,
  LABEL_TEXT_INFO,
  LABEL_TEXT_LAB_COUNT,
  LABEL_TEXT_NAME,
  LABEL_TEXT_OPTIONAL,
  LABEL_TEXT_RELATIONSHIPS,
  LABEL_TEXT_SELECT_FACTION,
  LABEL_TEXT_SORT_ORDER,
  TEXT_IS_LOADING_UPDATE,
  TEXT_IS_SUCCESS_UPDATE,
} from '../../config/strings';
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
  const queryClient = useQueryClient();

  const mutation = useMutation(editFaction, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(COLLECTION_FACTIONS);
    },
  });

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
            htmlFor="updateFaction"
            className="w-32 h-8 flex items-center gap-x-2"
          >
            {LABEL_TEXT_SELECT_FACTION}
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
            name="updateFaction"
            className="flex-1 border"
            value={selected}
            onChange={handleSelected}
          >
            <option key="updateFaction-none" value={''}>
              {LABEL_TEXT_SELECT_FACTION}
            </option>
            {factions &&
              Object.keys(factions).map((id) => (
                <option key={`updateFaction-${id}`} value={id}>
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
          <FormHeader>{LABEL_TEXT_RELATIONSHIPS}</FormHeader>
          <div className="flex gap-x-2 items-center px-2">
            <label
              htmlFor="associates"
              className="w-32 flex items-center gap-x-2"
            >
              {LABEL_TEXT_ASSOCIATES}
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
              {LABEL_TEXT_ALLIES}
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
              {LABEL_TEXT_FRIENDS}
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
              {LABEL_TEXT_COLD_WAR}
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
              {LABEL_TEXT_HOT_WAR}
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
              {LABEL_TEXT_ENEMIES}
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
              {mutation.isLoading && TEXT_IS_LOADING_UPDATE}
              {mutation.isError && `${error.response.data.message}`}
              {mutation.isSuccess && TEXT_IS_SUCCESS_UPDATE}
            </span>
            <SubmitButton isLoading={mutation.isLoading}>
              {mutation.isError ? EVENT_TEXT_RESET : EVENT_TEXT_UPDATE}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Accordian>
  );
}

export default EditForm;
