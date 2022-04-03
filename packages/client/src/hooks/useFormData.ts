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
import { HydratedFactionProps } from '../types';

export function useFormData(props?: HydratedFactionProps) {
  const [state, dispatch] = useReducer(reducer, props || initialState);

  // handlers
  const handleSetAll = (data: HydratedFactionProps) =>
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

  const handleAllies: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    dispatch({ type: SET_ALLIES, payload: value });
  };
  const handleAssociates: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    dispatch({ type: SET_ASSOCIATES, payload: value });
  };
  const handleColdWar: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    dispatch({ type: SET_COLD_WAR, payload: value });
  };
  const handleEnemies: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    dispatch({ type: SET_ENEMIES, payload: value });
  };

  const handleFriends: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    dispatch({ type: SET_FRIENDS, payload: value });
  };

  const handleHotWar: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    dispatch({ type: SET_HOT_WAR, payload: value });
  };

  // resets
  const resetState = () => dispatch({ type: INIT });
  const resetAllies: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({ type: SET_ALLIES, payload: props?.relationships.allies || [] });
  const resetAssociates: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_ASSOCIATES,
      payload: props?.relationships.associates || [],
    });
  const resetColdWar: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_COLD_WAR,
      payload: props?.relationships.coldWar || [],
    });
  const resetEnemies: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_ENEMIES,
      payload: props?.relationships.enemies || [],
    });
  const resetFriends: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({
      type: SET_FRIENDS,
      payload: props?.relationships.friends || [],
    });
  const resetHotWar: MouseEventHandler<HTMLSpanElement> = () =>
    dispatch({ type: SET_HOT_WAR, payload: props?.relationships.hotWar || [] });

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
