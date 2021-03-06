import { sanitize } from 'dompurify';
import { ChangeEvent, ChangeEventHandler, useReducer } from 'react';
import {
  INIT,
  SET_ACTIVE,
  SET_ALL,
  SET_ALLIES,
  SET_AFFILIATES,
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
  SET_VISIBILITY,
  SET_URL,
} from '../config/constants';
import { initialState, reducer } from '../reducers/formData.reducer';
import {
  Relationship,
  TimestampedFaction,
  Website,
} from '../../../../../../../types';

export interface FormDataHandlers {
  handleSetAll: (data: TimestampedFaction | null) => void;
  handleVisibility: ChangeEventHandler<HTMLInputElement>;
  handleActive: ChangeEventHandler<HTMLInputElement>;
  handleDisplayName: ChangeEventHandler<HTMLInputElement>;
  handleName: ChangeEventHandler<HTMLInputElement>;
  handleOrder: ChangeEventHandler<HTMLInputElement>;
  handleBenchCount: ChangeEventHandler<HTMLInputElement>;
  handleHasBench: ChangeEventHandler<HTMLInputElement>;
  handleHasLab: ChangeEventHandler<HTMLInputElement>;
  handleLabCount: ChangeEventHandler<HTMLInputElement>;
  handleAllies: ChangeEventHandler<HTMLSelectElement>;
  handleAffiliates: ChangeEventHandler<HTMLSelectElement>;
  handleColdWars: ChangeEventHandler<HTMLSelectElement>;
  handleEnemies: ChangeEventHandler<HTMLSelectElement>;
  handleFriends: ChangeEventHandler<HTMLSelectElement>;
  handleHotWars: ChangeEventHandler<HTMLSelectElement>;
  handleRelationship: (
    event: ChangeEvent<HTMLSelectElement>,
    type: Relationship
  ) => void;
  handleUrls: (event: ChangeEvent<HTMLInputElement>, name: Website) => void;
  resetState: VoidFunction;
  resetAllies: VoidFunction;
  resetAffiliates: VoidFunction;
  resetColdWars: VoidFunction;
  resetEnemies: VoidFunction;
  resetFriends: VoidFunction;
  resetHotWars: VoidFunction;
  resetRelationship: (type: Relationship) => void;
}

export interface UseFormData {
  state: TimestampedFaction;
  handlers: FormDataHandlers;
}

export function useFormData(props?: Partial<TimestampedFaction>): UseFormData {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...props });

  const handleSetAll = (data: TimestampedFaction | null) => {
    if (!data) return;
    dispatch({ type: SET_ALL, payload: data });
  };
  const handleVisibility: ChangeEventHandler<HTMLInputElement> = () =>
    dispatch({ type: SET_VISIBILITY });
  const handleActive: ChangeEventHandler<HTMLInputElement> = () => {
    dispatch({ type: SET_ACTIVE });
  };
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

  const handleAffiliates: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_AFFILIATES,
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

  const handleRelationship = (
    event: ChangeEvent<HTMLSelectElement>,
    type: Relationship
  ) => {
    switch (type) {
      case 'allies':
        return handleAllies(event);
      case 'affiliates':
        return handleAffiliates(event);
      case 'coldWars':
        return handleColdWars(event);
      case 'enemies':
        return handleEnemies(event);
      case 'friends':
        return handleFriends(event);
      case 'hotWars':
        return handleHotWars(event);
      default:
        throw new Error('Invalid Relationship type in handleRelationship');
    }
  };

  const handleUrls = (event: ChangeEvent<HTMLInputElement>, name: Website) => {
    dispatch({
      type: SET_URL,
      name,
      payload: event.target.value,
    });
  };

  const resetState = () => dispatch({ type: INIT, payload: props || {} });
  const resetAllies = () =>
    dispatch({
      type: SET_ALLIES,
      payload: props?.relationships?.allies || [],
    });
  const resetAffiliates = () =>
    dispatch({
      type: SET_AFFILIATES,
      payload: props?.relationships?.affiliates || [],
    });
  const resetColdWars = () =>
    dispatch({
      type: SET_COLD_WAR,
      payload: props?.relationships?.coldWars || [],
    });
  const resetEnemies = () =>
    dispatch({
      type: SET_ENEMIES,
      payload: props?.relationships?.enemies || [],
    });
  const resetFriends = () =>
    dispatch({
      type: SET_FRIENDS,
      payload: props?.relationships?.friends || [],
    });
  const resetHotWars = () =>
    dispatch({
      type: SET_HOT_WAR,
      payload: props?.relationships?.hotWars || [],
    });

  const resetRelationship = (type: Relationship) => {
    switch (type) {
      case 'allies':
        return resetAllies();
      case 'affiliates':
        return resetAffiliates();
      case 'coldWars':
        return resetColdWars();
      case 'enemies':
        return resetEnemies();
      case 'friends':
        return resetFriends();
      case 'hotWars':
        return resetHotWars();
      default:
        throw new Error('Invalid Relationship type in resetRelationship');
    }
  };

  return {
    state,
    handlers: {
      handleSetAll,
      handleVisibility,
      handleActive,
      handleDisplayName,
      handleName,
      handleOrder,
      handleBenchCount,
      handleHasBench,
      handleHasLab,
      handleLabCount,
      handleAllies,
      handleAffiliates,
      handleColdWars,
      handleEnemies,
      handleFriends,
      handleHotWars,
      handleRelationship,
      handleUrls,
      resetState,
      resetAllies,
      resetAffiliates,
      resetColdWars,
      resetEnemies,
      resetFriends,
      resetHotWars,
      resetRelationship,
    },
  };
}
