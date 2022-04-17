import { Timestamp } from 'firebase/firestore';
import {
  INIT,
  SET_ALL,
  SET_ACTIVE,
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
} from '../config/constants';
import { TimestampedFaction } from '../../../../../../../types';

export const initialState: TimestampedFaction = {
  active: true,
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
    allies: [],
    affiliates: [],
    coldWars: [],
    enemies: [],
    friends: [],
    hotWars: [],
  },
  updated: new Timestamp(0, 0),
  visibility: 'public',
};

export type FactionAction =
  | { type: typeof INIT; payload: Partial<TimestampedFaction> }
  | { type: typeof SET_ALL; payload: TimestampedFaction }
  | { type: typeof SET_VISIBILITY }
  | { type: typeof SET_ACTIVE }
  | { type: typeof SET_DISPLAY_NAME; payload: string }
  | { type: typeof SET_NAME; payload: string }
  | { type: typeof SET_ORDER; payload: number }
  | { type: typeof SET_BENCH_COUNT; payload: number }
  | { type: typeof SET_HAS_BENCH }
  | { type: typeof SET_HAS_LAB }
  | { type: typeof SET_LAB_COUNT; payload: number }
  | { type: typeof SET_ALLIES; payload: string[] }
  | { type: typeof SET_AFFILIATES; payload: string[] }
  | { type: typeof SET_COLD_WAR; payload: string[] }
  | { type: typeof SET_ENEMIES; payload: string[] }
  | { type: typeof SET_FRIENDS; payload: string[] }
  | { type: typeof SET_HOT_WAR; payload: string[] };

export function reducer(
  state: TimestampedFaction,
  action: FactionAction
): TimestampedFaction {
  switch (action.type) {
    case INIT:
      return { ...state, ...initialState, ...action.payload };
    case SET_ALL:
      return { ...state, ...action.payload };
    case SET_ACTIVE:
      const active = !state.active;
      return {
        ...state,
        active,
      };
    case SET_VISIBILITY:
      const visibility = state.visibility === 'public' ? 'private' : 'public';
      return {
        ...state,
        visibility: visibility,
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
          allies: action.payload,
        },
      };
    case SET_AFFILIATES:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          affiliates: action.payload,
        },
      };
    case SET_COLD_WAR:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          coldWars: action.payload,
        },
      };
    case SET_ENEMIES:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          enemies: action.payload,
        },
      };
    case SET_FRIENDS:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          friends: action.payload,
        },
      };
    case SET_HOT_WAR:
      return {
        ...state,
        relationships: {
          ...state.relationships,
          hotWars: action.payload,
        },
      };
    default:
      throw new Error('Invalid dispatch action in Form Data reducer');
  }
}
