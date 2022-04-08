import { sanitize } from 'dompurify';
import { ChangeEventHandler, MouseEventHandler, useReducer } from 'react';
import {
  INIT,
  SET_ACTIVE,
  SET_ALL,
  SET_ALLIES,
  SET_ASSOCIATES,
  SET_BENCH_COUNT,
  SET_COLD_WAR,
  SET_DISPLAY_NAME,
  SET_ENEMIES,
  SET_FRIENDS,
  SET_HAS_BENCH,
  SET_HAS_LAB,
  SET_HOT_WAR,
  SET_LAB_COUNT,
  SET_NAME,
  SET_ORDER,
} from '../config/constants';
import { initialState, reducer } from '../reducers/formData.reducer';
import { Relationship, TimestampedFactionProps } from '../types';

export interface FormDataHandlers {
  handleSetAll: (data: TimestampedFactionProps | null) => void;
  handleActive: ChangeEventHandler<HTMLInputElement>;
  handleDisplayName: ChangeEventHandler<HTMLInputElement>;
  handleName: ChangeEventHandler<HTMLInputElement>;
  handleOrder: ChangeEventHandler<HTMLInputElement>;
  handleBenchCount: ChangeEventHandler<HTMLInputElement>;
  handleHasBench: ChangeEventHandler<HTMLInputElement>;
  handleHasLab: ChangeEventHandler<HTMLInputElement>;
  handleLabCount: ChangeEventHandler<HTMLInputElement>;
  handleAllies: ChangeEventHandler<HTMLSelectElement>;
  handleAssociates: ChangeEventHandler<HTMLSelectElement>;
  handleColdWars: ChangeEventHandler<HTMLSelectElement>;
  handleEnemies: ChangeEventHandler<HTMLSelectElement>;
  handleFriends: ChangeEventHandler<HTMLSelectElement>;
  handleHotWars: ChangeEventHandler<HTMLSelectElement>;
  handleRelationship: (
    type: Relationship
  ) => ChangeEventHandler<HTMLSelectElement>;
  resetState: VoidFunction;
  resetAllies: MouseEventHandler<HTMLButtonElement>;
  resetAssociates: MouseEventHandler<HTMLButtonElement>;
  resetColdWars: MouseEventHandler<HTMLButtonElement>;
  resetEnemies: MouseEventHandler<HTMLButtonElement>;
  resetFriends: MouseEventHandler<HTMLButtonElement>;
  resetHotWars: MouseEventHandler<HTMLButtonElement>;
  resetRelationship: (
    type: Relationship
  ) => MouseEventHandler<HTMLButtonElement>;
}

export interface UseFormData {
  state: TimestampedFactionProps;
  handlers: FormDataHandlers;
}

export function useFormData(
  props?: Partial<TimestampedFactionProps>
): UseFormData {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...props });

  const handleSetAll = (data: TimestampedFactionProps | null) => {
    if (!data) return;
    dispatch({ type: SET_ALL, payload: data });
  };
  const handleActive: ChangeEventHandler<HTMLInputElement> = () =>
    dispatch({ type: SET_ACTIVE });
  const handleDisplayName: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch({ type: SET_DISPLAY_NAME, payload: sanitize(event.target.value) });
  const handleName: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch({ type: SET_NAME, payload: sanitize(event.target.value) });
  const handleOrder: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch({ type: SET_ORDER, payload: Number(event.target.value) });

  const handleBenchCount: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch({ type: SET_BENCH_COUNT, payload: parseInt(event.target.value) });
  const handleHasBench: ChangeEventHandler<HTMLInputElement> = () =>
    dispatch({ type: SET_HAS_BENCH });
  const handleHasLab: ChangeEventHandler<HTMLInputElement> = () =>
    dispatch({ type: SET_HAS_LAB });
  const handleLabCount: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch({
      type: SET_LAB_COUNT,
      payload: parseFloat(event.target.value),
    });

  const formatRelationshipSet = (
    selectedOptions: HTMLCollectionOf<HTMLOptionElement>
  ) => Array.from(selectedOptions, (option) => option.value);

  const handleAllies: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_ALLIES,
      payload: formatRelationshipSet(event.target.selectedOptions),
    });

  const handleAssociates: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_ASSOCIATES,
      payload: formatRelationshipSet(event.target.selectedOptions),
    });

  const handleColdWars: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_COLD_WAR,
      payload: formatRelationshipSet(event.target.selectedOptions),
    });

  const handleEnemies: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_ENEMIES,
      payload: formatRelationshipSet(event.target.selectedOptions),
    });

  const handleFriends: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_FRIENDS,
      payload: formatRelationshipSet(event.target.selectedOptions),
    });

  const handleHotWars: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_HOT_WAR,
      payload: formatRelationshipSet(event.target.selectedOptions),
    });

  const handleRelationship = (type: Relationship) => {
    switch (type) {
      case 'allies':
        return handleAllies;
      case 'associates':
        return handleAssociates;
      case 'coldWars':
        return handleColdWars;
      case 'enemies':
        return handleEnemies;
      case 'friends':
        return handleFriends;
      case 'hotWars':
        return handleHotWars;
      default:
        throw new Error('Invalid Relationship type in handleRelationship');
    }
  };

  const resetState = () => dispatch({ type: INIT, payload: props || {} });
  const resetAllies: MouseEventHandler<HTMLButtonElement> = () =>
    dispatch({
      type: SET_ALLIES,
      payload: props?.relationships?.allies.data || [],
    });
  const resetAssociates: MouseEventHandler<HTMLButtonElement> = () =>
    dispatch({
      type: SET_ASSOCIATES,
      payload: props?.relationships?.associates.data || [],
    });
  const resetColdWars: MouseEventHandler<HTMLButtonElement> = () =>
    dispatch({
      type: SET_COLD_WAR,
      payload: props?.relationships?.coldWars.data || [],
    });
  const resetEnemies: MouseEventHandler<HTMLButtonElement> = () =>
    dispatch({
      type: SET_ENEMIES,
      payload: props?.relationships?.enemies.data || [],
    });
  const resetFriends: MouseEventHandler<HTMLButtonElement> = () =>
    dispatch({
      type: SET_FRIENDS,
      payload: props?.relationships?.friends.data || [],
    });
  const resetHotWars: MouseEventHandler<HTMLButtonElement> = () =>
    dispatch({
      type: SET_HOT_WAR,
      payload: props?.relationships?.hotWars.data || [],
    });

  const resetRelationship = (type: Relationship) => {
    switch (type) {
      case 'allies':
        return resetAllies;
      case 'associates':
        return resetAssociates;
      case 'coldWars':
        return resetColdWars;
      case 'enemies':
        return resetEnemies;
      case 'friends':
        return resetFriends;
      case 'hotWars':
        return resetHotWars;
      default:
        throw new Error('Invalid Relationship type in resetRelationship');
    }
  };

  return {
    state,
    handlers: {
      handleSetAll,
      handleActive,
      handleDisplayName,
      handleName,
      handleOrder,
      handleBenchCount,
      handleHasBench,
      handleHasLab,
      handleLabCount,
      handleAllies,
      handleAssociates,
      handleColdWars,
      handleEnemies,
      handleFriends,
      handleHotWars,
      handleRelationship,
      resetState,
      resetAllies,
      resetAssociates,
      resetColdWars,
      resetEnemies,
      resetFriends,
      resetHotWars,
      resetRelationship,
    },
  };
}
