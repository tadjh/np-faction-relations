import clsx from 'clsx';
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { SERVER } from '../../config/db';
import FACTIONS from '../../config/factions';
import Accordian from '../Accordian';
import SubmitButton from '../SubmitButton';
import { useMutation } from 'react-query';
import axios from 'axios';
import { FactionProps } from '../../types';

function AddForm() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [hasBench, setHasBench] = useState(false);
  const [benchCount, setBenchCount] = useState(0);
  const [associates, setAssociates] = useState<string[]>([]);
  const [allies, setAllies] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [hotWar, setHotWar] = useState<string[]>([]);
  const [coldWar, setColdWar] = useState<string[]>([]);
  const [enemies, setEnemies] = useState<string[]>([]);
  const [order, setOrder] = useState<number>(FACTIONS.length);
  // const queryClient = useQueryClient();

  const mutation = useMutation((newFaction: FactionProps) =>
    axios.post(`${SERVER}/faction`, newFaction)
  );

  useEffect(() => {
    console.log('mutation', mutation);
  });

  const error = mutation.error as any;

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

  const resetState = () => {
    setName('');
    setNickname('');
    setHasBench(false);
    setBenchCount(0);
    setAssociates([]);
    setAllies([]);
    setFriends([]);
    setHotWar([]);
    setColdWar([]);
    setEnemies([]);
    setOrder(FACTIONS.length);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (mutation.isSuccess || mutation.isError) {
      resetState();
      return mutation.reset();
    }

    mutation.mutate({
      name,
      nickname,
      hasBench,
      benchCount,
      associates,
      allies,
      friends,
      hotWar,
      coldWar,
      enemies,
      active: true,
      order,
    });
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
