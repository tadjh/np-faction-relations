import clsx from 'clsx';
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import FACTIONS from '../../config/factions';
function AddForm() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleAddAccordian: MouseEventHandler<HTMLSpanElement> = (event) => {
    setIsOpen((prevState) => !prevState);
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleAbbrChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAbbr(event.target.value);
  };

  const handleHasBench: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasBench((prevState) => !prevState);
  };

  const handleBenchCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBenchCount(event.target.value);
  };

  const handleAssociatesChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setAssociates(value);
  };

  const handleAlliesChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setAllies(value);
  };
  const handleFriendsChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFriends(value);
  };
  const handleHotWarChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setHotWar(value);
  };
  const handleColdWarChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setColdWar(value);
  };
  const handleEnemiesChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
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
    <div className="flex items-center flex-col justify-center shadow w-full">
      <div
        className="bg-stone-700 text-white text-opacity-90 w-full hover:cursor-pointer hover:bg-stone-900 transition-colors"
        onClick={handleAddAccordian}
      >
        <div className="flex justify-between items-center p-2">
          <span>add faction</span>
          <span className={clsx('text-base', isOpen && 'rotate-180')}>
            &#x25BC;
          </span>
        </div>
      </div>
      <form
        className={clsx(
          'text-xs border-l border-b border-r w-full gap-y-2 flex flex-col',
          isOpen ? 'max-h-[700px] overflow-auto' : 'max-h-0 overflow-hidden',
          'transition-all'
        )}
        onSubmit={handleSubmit}
      >
        <div className="flex gap-x-2 items-center justify-between px-2 pt-2">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border"
            value={name}
            onChange={handleNameChange}
          />
          <label htmlFor="nickname">abbr</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="border"
            value={abbr}
            onChange={handleAbbrChange}
          />
        </div>
        <div className="flex gap-x-2 items-center h-5 px-2">
          <label htmlFor="hasBench">has bench?</label>
          <input
            type="checkbox"
            id="hasBench"
            name="hasBench"
            checked={hasBench}
            onChange={handleHasBench}
          />
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
              'border w-10 text-center',
              'transition-opacity'
            )}
            min={1}
            value={benchCount}
            onChange={handleBenchCount}
          />
        </div>
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
            onChange={handleAssociatesChange}
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
            onChange={handleAlliesChange}
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
            onChange={handleFriendsChange}
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
            onChange={handleHotWarChange}
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
            onChange={handleColdWarChange}
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
            onChange={handleEnemiesChange}
          >
            {FACTIONS.map((faction) => (
              <option key={`enemies-${faction.id}`} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-end p-2 h-11">
          {!isFetching ? (
            <button
              type="submit"
              className="text-xs hover:cursor-pointer bg-stone-700 hover:bg-stone-900 border transition-colors text-white text-opacity-90 px-4 py-1 w-16"
            >
              save
            </button>
          ) : (
            <div className="w-16 flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-stone-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddForm;
