import clsx from 'clsx';
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import FACTIONS from '../../config/factions';
import { FactionProps } from '../../types';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';

function EditForm(props: FactionProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selected, setSelected] = useState('');
  const [name, setName] = useState(props.name);
  const [nickname, setNickname] = useState(props.nickname);
  const [hasBench, setHasBench] = useState(props.hasBench);
  const [benchCount, setBenchCount] = useState(props.benchCount);
  const [associates, setAssociates] = useState<string[]>(props.associates);
  const [allies, setAllies] = useState<string[]>(props.allies);
  const [friends, setFriends] = useState<string[]>(props.friends);
  const [hotWar, setHotWar] = useState<string[]>(props.hotWar);
  const [coldWar, setColdWar] = useState<string[]>(props.coldWar);
  const [enemies, setEnemies] = useState<string[]>(props.enemies);
  const [order, setOrder] = useState<number>(props.order);

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

  const handleName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleNickname: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNickname(event.target.value);
  };

  const handleHasBench: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasBench((prevState) => !prevState);
  };

  const handleBenchCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBenchCount(parseInt(event.target.value));
  };

  const handleAssociates: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setAssociates(value);
  };

  const handleAllies: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setAllies(value);
  };

  const handleFriends: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFriends(value);
  };

  const handleHotWar: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setHotWar(value);
  };

  const handleColdWar: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setColdWar(value);
  };

  const handleEnemies: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setEnemies(value);
  };

  const handleOrder: ChangeEventHandler<HTMLInputElement> = (event) => {
    setOrder(Number(event.target.value));
  };

  const resetSelected: MouseEventHandler<HTMLSpanElement> = (event) => {
    setIsAnimating(false);
    const timeout = setTimeout(() => {
      setSelected('');
      clearTimeout(timeout);
    }, 150);
  };

  const resetAssociates: MouseEventHandler<HTMLSpanElement> = (event) => {
    setAssociates(props.associates);
  };

  const resetAllies: MouseEventHandler<HTMLSpanElement> = (event) => {
    setAllies(props.allies);
  };

  const resetFriends: MouseEventHandler<HTMLSpanElement> = (event) => {
    setFriends(props.friends);
  };
  const resetHotWar: MouseEventHandler<HTMLSpanElement> = (event) => {
    setHotWar(props.hotWar);
  };
  const resetColdWar: MouseEventHandler<HTMLSpanElement> = (event) => {
    setColdWar(props.coldWar);
  };
  const resetEnemies: MouseEventHandler<HTMLSpanElement> = (event) => {
    setEnemies(props.enemies);
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
            {FACTIONS.map((faction) => (
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
                value={name}
                onChange={handleName}
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
                value={nickname}
                onChange={handleNickname}
              />
            </div>
            <div className="flex gap-x-2 items-center h-5 px-2">
              <div className="flex gap-x-2 items-center w-32">
                <label htmlFor="hasBench">has bench?</label>
                <input
                  type="checkbox"
                  id="hasBench"
                  name="hasBench"
                  checked={hasBench}
                  onChange={handleHasBench}
                />
              </div>
              <label
                htmlFor="benchCount"
                className={clsx(
                  !hasBench ? 'opacity-0' : 'opacity-100',
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
                  !hasBench ? 'opacity-0' : 'opacity-100',
                  'border w-10 text-right',
                  'transition-opacity'
                )}
                value={benchCount}
                onChange={handleBenchCount}
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
                {associates.length !== 0 && (
                  <span
                    className="text-base hover:cursor-pointer"
                    onClick={resetAssociates}
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
                value={associates}
                onChange={handleAssociates}
              >
                {FACTIONS.map((faction) => (
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
                {allies.length !== 0 && (
                  <span
                    className="text-base hover:cursor-pointer"
                    onClick={resetAllies}
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
                value={allies}
                onChange={handleAllies}
              >
                {FACTIONS.map((faction) => (
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
                {friends.length !== 0 && (
                  <span
                    className="text-base hover:cursor-pointer"
                    onClick={resetFriends}
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
                value={friends}
                onChange={handleFriends}
              >
                {FACTIONS.map((faction) => (
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
                {hotWar.length !== 0 && (
                  <span
                    className="text-base hover:cursor-pointer"
                    onClick={resetHotWar}
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
                value={hotWar}
                onChange={handleHotWar}
              >
                {FACTIONS.map((faction) => (
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
                {coldWar.length !== 0 && (
                  <span
                    className="text-base hover:cursor-pointer"
                    onClick={resetColdWar}
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
                value={coldWar}
                onChange={handleColdWar}
              >
                {FACTIONS.map((faction) => (
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
                {enemies.length !== 0 && (
                  <span
                    className="text-base hover:cursor-pointer"
                    onClick={resetEnemies}
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
                value={enemies}
                onChange={handleEnemies}
              >
                {FACTIONS.map((faction) => (
                  <option key={`enemies-${faction.id}`} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2 items-center px-2">
              <label htmlFor="order">sort order</label>
              <input
                type="number"
                id="order"
                name="order"
                className="border w-10 text-right"
                min={0}
                value={order}
                onChange={handleOrder}
              />
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
