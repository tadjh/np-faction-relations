import clsx from 'clsx';
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { useFormData } from '../../hooks';
import { HydratedFactionProps } from '../../types';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';
interface EditFormProps {
  factions: HydratedFactionProps[];
}
function EditForm({ factions }: EditFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selected, setSelected] = useState('');
  const { state, handlers } = useFormData();

  const handleSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const data = selected;
    setSelected(event.target.value);

    if (data === '') {
      const timeout = setTimeout(() => {
        setIsAnimating(true);
        clearTimeout(timeout);
      }, 0);
    }
  };

  const resetSelected: MouseEventHandler<HTMLSpanElement> = (event) => {
    setIsAnimating(false);
    const timeout = setTimeout(() => {
      setSelected('');
      clearTimeout(timeout);
    }, 150);
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
    <Accordian label="edit faction">
      <form onSubmit={handleSubmit} className="gap-y-2 flex flex-col">
        <div
          className={clsx(
            'flex gap-x-2 items-center px-2 pt-4',
            selected === '' && 'pb-2'
          )}
        >
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
            {factions.map((faction) => (
              <option key={`selected-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        {selected !== '' && (
          <div
            className={clsx(
              'flex flex-col gap-y-2',
              isAnimating
                ? 'max-h-[800px] overflow-auto'
                : 'max-h-0 overflow-hidden',
              'transition-all'
            )}
          >
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
              <label htmlFor="displayName" className="w-32">
                display name <span className="text-[8px]">optional</span>
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
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
            <h3 className="pt-4 px-2">
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
                {factions.map((faction) => (
                  <option key={`associates-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2 items-center px-2">
              <label
                htmlFor="allies"
                className="w-32 flex items-center gap-x-2"
              >
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
                {factions.map((faction) => (
                  <option key={`allies-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2 items-center px-2">
              <label
                htmlFor="friends"
                className="w-32 flex items-center gap-x-2"
              >
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
                {factions.map((faction) => (
                  <option key={`friends-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2 items-center px-2">
              <label
                htmlFor="hotWar"
                className="w-32 flex items-center gap-x-2"
              >
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
                {factions.map((faction) => (
                  <option key={`hotWar-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2 items-center px-2">
              <label
                htmlFor="coldWar"
                className="w-32 flex items-center gap-x-2"
              >
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
                {factions.map((faction) => (
                  <option key={`coldWar-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2 items-center px-2">
              <label
                htmlFor="enemies"
                className="w-32 flex items-center gap-x-2"
              >
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
                {factions.map((faction) => (
                  <option key={`enemies-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex justify-end items-center p-2 h-11">
              <SubmitButton isFetching={isFetching}>save</SubmitButton>
            </div>
          </div>
        )}
      </form>
    </Accordian>
  );
}

export default EditForm;
