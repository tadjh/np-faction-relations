import clsx from 'clsx';
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import FACTIONS from '../../config/factions';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';
function AddForm() {
  const [isFetching, setIsFetching] = useState(false);
  const [name, setName] = useState('');
  const [abbr, setAbbr] = useState('');
  const [hasBench, setHasBench] = useState(false);
  const [benchCount, setBenchCount] = useState('1');
  const [associates, setAssociates] = useState<string[]>([]);
  const [allies, setAllies] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [hotWar, setHotWar] = useState<string[]>([]);
  const [coldWar, setColdWar] = useState<string[]>([]);
  const [enemies, setEnemies] = useState<string[]>([]);

  const handleName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleAbbr: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAbbr(event.target.value);
  };

  const handleHasBench: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasBench((prevState) => !prevState);
  };

  const handleBenchCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBenchCount(event.target.value);
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

  const resetAssociates: MouseEventHandler<HTMLSpanElement> = (event) => {
    setAssociates([]);
  };

  const resetAllies: MouseEventHandler<HTMLSpanElement> = (event) => {
    setAllies([]);
  };

  const resetFriends: MouseEventHandler<HTMLSpanElement> = (event) => {
    setFriends([]);
  };
  const resetHotWar: MouseEventHandler<HTMLSpanElement> = (event) => {
    setHotWar([]);
  };
  const resetColdWar: MouseEventHandler<HTMLSpanElement> = (event) => {
    setColdWar([]);
  };
  const resetEnemies: MouseEventHandler<HTMLSpanElement> = (event) => {
    setEnemies([]);
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
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="flex gap-x-2 items-center px-2">
          <label htmlFor="nickname" className="w-32">
            abbr <span className="text-[8px]">optional</span>
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="border flex-1"
            value={abbr}
            onChange={handleAbbr}
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
            min={1}
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
          <label htmlFor="allies" className="w-32 flex items-center gap-x-2">
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
          <label htmlFor="friends" className="w-32 flex items-center gap-x-2">
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
          <label htmlFor="hotWar" className="w-32 flex items-center gap-x-2">
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
          <label htmlFor="coldWar" className="w-32 flex items-center gap-x-2">
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
          <label htmlFor="enemies" className="w-32 flex items-center gap-x-2">
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
        <SubmitButton isFetching={isFetching}>save</SubmitButton>
      </form>
    </Accordian>
  );
}

export default AddForm;
