import { Timestamp } from 'firebase/firestore';
import {
  INIT,
  SET_ALL,
  SET_ACTIVE,
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
import { TimestampedFactionProps } from '../types';

export const initialState: TimestampedFactionProps = {
  visibility: 'public',
  attributes: {
    benchCount: 0,
    hasBench: false,
    hasLab: false,
    labCount: 0,
  },
  created: new Timestamp(0, 0),
  displayName: '',
  name: '',
  order: 0,
  relationships: {
    allies: { type: 'allies', data: [] },
    associates: { type: 'associates', data: [] },
    coldWar: { type: 'coldWar', data: [] },
    enemies: { type: 'enemies', data: [] },
    friends: { type: 'friends', data: [] },
    hotWar: { type: 'hotWar', data: [] },
  },
  updated: new Timestamp(0, 0),
};

export type FactionAction =
  | { type: typeof INIT }
  | { type: typeof SET_ALL; payload: TimestampedFactionProps }
  | { type: typeof SET_ACTIVE }
  | { type: typeof SET_DISPLAY_NAME; payload: string }
  | { type: typeof SET_NAME; payload: string }
  | { type: typeof SET_ORDER; payload: number }
  | { type: typeof SET_BENCH_COUNT; payload: number }
  | { type: typeof SET_HAS_BENCH }
  | { type: typeof SET_HAS_LAB }
  | { type: typeof SET_LAB_COUNT; payload: number }
  | { type: typeof SET_ALLIES; payload: string[] }
  | { type: typeof SET_ASSOCIATES; payload: string[] }
  | { type: typeof SET_COLD_WAR; payload: string[] }
  | { type: typeof SET_ENEMIES; payload: string[] }
  | { type: typeof SET_FRIENDS; payload: string[] }
  | { type: typeof SET_HOT_WAR; payload: string[] };

export function reducer(
  state: TimestampedFactionProps,
  action: FactionAction
): TimestampedFactionProps {
  switch (action.type) {
    case INIT:
      return { ...state, ...initialState };
    case SET_ALL:
      return { ...state, ...action.payload };
    case SET_ACTIVE:
      return {
        ...state,
        visibility: state.visibility === 'public' ? 'private' : 'public',
      };
    case SET_DISPLAY_NAME:
      return { ...state, displayName: action.payload };
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_ORDER:
      return { ...state, order: action.payload };
    case SET_BENCH_COUNT:
      return {
        ...state,
        attributes: { ...state.attributes, benchCount: action.payload },
      };
    case SET_HAS_BENCH:
      const hasBench = !state.attributes.hasBench;
      const benchCount =
        hasBench && state.attributes.benchCount === 0
          ? 1
          : state.attributes.benchCount;
      return {
        ...state,
        attributes: {
          ...state.attributes,
          hasBench,
          benchCount,
        },
      };
    case SET_HAS_LAB:
      const hasLab = !state.attributes.hasLab;
      const labCount =
        hasLab && state.attributes.labCount === 0
          ? 1
          : state.attributes.labCount;
      return {
        ...state,
        attributes: { ...state.attributes, hasLab, labCount },
      };
    case SET_LAB_COUNT:
      return {
        ...state,
        attributes: { ...state.attributes, labCount: action.payload },
      };
    case SET_ALLIES:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          allies: { ...state.relationships.allies, data: action.payload },
        },
      };
    case SET_ASSOCIATES:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          associates: {
            ...state.relationships.associates,
            data: action.payload,
          },
        },
      };
    case SET_COLD_WAR:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          coldWar: { ...state.relationships.coldWar, data: action.payload },
        },
      };
    case SET_ENEMIES:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          enemies: { ...state.relationships.enemies, data: action.payload },
        },
      };
    case SET_FRIENDS:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          friends: { ...state.relationships.friends, data: action.payload },
        },
      };
    case SET_HOT_WAR:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          hotWar: { ...state.relationships.hotWar, data: action.payload },
        },
      };
    default:
      throw new Error('Invalid dispatch action in Form Data reducer');
  }
}
