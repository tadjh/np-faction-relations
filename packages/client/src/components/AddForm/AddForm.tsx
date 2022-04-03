import clsx from 'clsx';
import { FormEventHandler } from 'react';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';
import { useMutation } from 'react-query';
import { FactionProps } from '../../types';
import { useApi, useFormData } from '../../hooks';

function AddForm() {
  const { state, handlers } = useFormData();
  const { createFaction } = useApi();

  // const queryClient = useQueryClient();

  const mutation = useMutation((faction: FactionProps) =>
    createFaction(faction)
  );

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
        <h3 className="flex items-center gap-x-2 pt-4 px-2">
          <span>info</span>
        </h3>
        <hr />
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="name" className="w-32">
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border flex-1"
            value={state.name}
            onChange={handlers.handleName}
          />
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="nickname" className="w-32">
            nickname <span className="text-[8px]">optional</span>
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="border flex-1"
            value={state.displayName}
            onChange={handlers.handleDisplayName}
          />
        </div>
        <div className="flex gap-x-2 items-center h-5 px-2">
          <div className="flex gap-x-2 items-center w-32">
            <label htmlFor="hasBench">has bench?</label>
            <input
              type="checkbox"
              id="hasBench"
              name="hasBench"
              checked={state.attributes.hasBench}
              onChange={handlers.handleHasBench}
            />
          </div>
          <label
            htmlFor="benchCount"
            className={clsx(
              !state.attributes.hasBench ? 'opacity-0' : 'opacity-100',
              'transition-opacity'
            )}
          >
            number of benches
          </label>
          <input
            type="number"
            id="benchCount"
            name="benchCount"
            className={clsx(
              !state.attributes.hasBench ? 'opacity-0' : 'opacity-100',
              'border w-10 text-right',
              'transition-opacity'
            )}
            value={state.attributes.benchCount}
            onChange={handlers.handleBenchCount}
          />
        </div>
        <div className="flex gap-x-2 items-center h-5 px-2">
          <div className="flex gap-x-2 items-center w-32">
            <label htmlFor="hasLab">has lab?</label>
            <input
              type="checkbox"
              id="hasLab"
              name="hasLab"
              checked={state.attributes.hasLab}
              onChange={handlers.handleHasLab}
            />
          </div>
          <label
            htmlFor="labCount"
            className={clsx(
              !state.attributes.hasLab ? 'opacity-0' : 'opacity-100',
              'transition-opacity'
            )}
          >
            number of labs
          </label>
          <input
            type="number"
            id="labCount"
            name="labCount"
            className={clsx(
              !state.attributes.hasLab ? 'opacity-0' : 'opacity-100',
              'border w-10 text-right',
              'transition-opacity'
            )}
            value={state.attributes.labCount}
            onChange={handlers.handleLabCount}
          />
        </div>
        {/* <h3 className="pt-4 px-2">
          <span>relationships</span>
        </h3>
        <hr />
        <div className="flex gap-x-2 items-center px-2">
          <label
            htmlFor="associates"
            className="w-32 flex items-center gap-x-2"
          >
            associates
            {state.relationships.associates.length !== 0 && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={handlers.resetAssociates}
              >
                &#8635;
              </span>
            )}
          </label>
          <select
            id="associates"
            name="associates"
            multiple
            className="flex-1 border"
            value={state.relationships.associates}
            onChange={handlers.handleAssociates}
          >
            {FACTIONS.map((faction) => (
              <option key={`associates-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="allies" className="w-32 flex items-center gap-x-2">
            allies
            {state.relationships.allies.length !== 0 && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={handlers.resetAllies}
              >
                &#8635;
              </span>
            )}
          </label>
          <select
            id="allies"
            name="allies"
            multiple
            className="flex-1 border"
            value={state.relationships.allies}
            onChange={handlers.handleAllies}
          >
            {FACTIONS.map((faction) => (
              <option key={`allies-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="friends" className="w-32 flex items-center gap-x-2">
            friends
            {state.relationships.friends.length !== 0 && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={handlers.resetFriends}
              >
                &#8635;
              </span>
            )}
          </label>
          <select
            id="friends"
            name="friends"
            multiple
            className="flex-1 border"
            value={state.relationships.friends}
            onChange={handlers.handleFriends}
          >
            {FACTIONS.map((faction) => (
              <option key={`friends-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="hotWar" className="w-32 flex items-center gap-x-2">
            hot war
            {state.relationships.hotWar.length !== 0 && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={handlers.resetHotWar}
              >
                &#8635;
              </span>
            )}
          </label>
          <select
            id="hotWar"
            name="hotWar"
            multiple
            className="flex-1 border"
            value={state.relationships.hotWar}
            onChange={handlers.handleHotWar}
          >
            {FACTIONS.map((faction) => (
              <option key={`hotWar-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="coldWar" className="w-32 flex items-center gap-x-2">
            cold war
            {state.relationships.coldWar.length !== 0 && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={handlers.resetColdWar}
              >
                &#8635;
              </span>
            )}
          </label>
          <select
            id="coldWar"
            name="coldWar"
            multiple
            className="flex-1 border"
            value={state.relationships.coldWar}
            onChange={handlers.handleColdWar}
          >
            {FACTIONS.map((faction) => (
              <option key={`coldWar-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="enemies" className="w-32 flex items-center gap-x-2">
            enemies
            {state.relationships.enemies.length !== 0 && (
              <span
                className="text-base hover:cursor-pointer"
                onClick={handlers.resetEnemies}
              >
                &#8635;
              </span>
            )}
          </label>
          <select
            id="enemies"
            name="enemies"
            multiple
            className="flex-1 border"
            value={state.relationships.enemies}
            onChange={handlers.handleEnemies}
          >
            {FACTIONS.map((faction) => (
              <option key={`enemies-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div> */}
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="order">sort order</label>
          <input
            type="number"
            id="order"
            name="order"
            className="border w-10 text-right"
            min={0}
            value={state.order}
            onChange={handlers.handleOrder}
          />
        </div>
        <div className="w-full flex justify-between items-center p-2 h-11">
          <span className={clsx(mutation.isError && 'text-red-600')}>
            {mutation.isLoading && 'Adding faction...'}
            {mutation.isError && `${error.response.data.message}`}
            {mutation.isSuccess && 'Faction added!'}
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
