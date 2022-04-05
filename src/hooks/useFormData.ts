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
import { TimestampedFactionProps } from '../types';

export function useFormData(props?: Partial<TimestampedFactionProps>) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...props });

  // handlers
  const handleSetAll = (data: TimestampedFactionProps) =>
    dispatch({ type: SET_ALL, payload: data });
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

  const handleColdWar: ChangeEventHandler<HTMLSelectElement> = (event) =>
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

  const handleHotWar: ChangeEventHandler<HTMLSelectElement> = (event) =>
    dispatch({
      type: SET_HOT_WAR,
      payload: formatRelationshipSet(event.target.selectedOptions),
    });

  // resets
  const resetState = () => dispatch({ type: INIT });
  const resetAllies: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_ALLIES,
      payload: props?.relationships?.allies.data || [],
    });
  const resetAssociates: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_ASSOCIATES,
      payload: props?.relationships?.associates.data || [],
    });
  const resetColdWar: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_COLD_WAR,
      payload: props?.relationships?.coldWar.data || [],
    });
  const resetEnemies: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_ENEMIES,
      payload: props?.relationships?.enemies.data || [],
    });
  const resetFriends: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_FRIENDS,
      payload: props?.relationships?.friends.data || [],
    });
  const resetHotWar: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_HOT_WAR,
      payload: props?.relationships?.hotWar.data || [],
    });

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
      handleColdWar,
      handleEnemies,
      handleFriends,
      handleHotWar,
      resetState,
      resetAllies,
      resetAssociates,
      resetColdWar,
      resetEnemies,
      resetFriends,
      resetHotWar,
    },
  };
}
