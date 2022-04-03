import { HydratedFactionProps } from '../types';
import {
  COLOR_ALLY,
  COLOR_ASSOCIATE,
  COLOR_BACKGROUND,
  COLOR_BACKGROUND_ALT,
  COLOR_COLD_WAR,
  COLOR_ENEMY,
  COLOR_FRIEND,
  COLOR_HAS_BENCH,
  COLOR_HOT_WAR,
} from './constants';

export const headerColor = (index = 1) =>
  index % 2 ? COLOR_BACKGROUND_ALT : undefined;

export const backgroundColor = (
  FACTIONS: HydratedFactionProps[],
  x: number,
  y: number
): string => {
  if (x === y) {
    if (FACTIONS[x].attributes.hasBench === true) return COLOR_HAS_BENCH;
    return 'diagonal-line';
  }

  for (let associate of FACTIONS[y].relationships.associates) {
    if (associate !== FACTIONS[x].id) continue;
    return COLOR_ASSOCIATE;
  }

  for (let ally of FACTIONS[y].relationships.allies) {
    if (ally !== FACTIONS[x].id) continue;
    return COLOR_ALLY;
  }

  for (let friend of FACTIONS[y].relationships.friends) {
    if (friend !== FACTIONS[x].id) continue;
    return COLOR_FRIEND;
  }

  for (let hot of FACTIONS[y].relationships.hotWar) {
    if (hot !== FACTIONS[x].id) continue;
    return COLOR_HOT_WAR;
  }

  for (let cold of FACTIONS[y].relationships.coldWar) {
    if (cold !== FACTIONS[x].id) continue;
    return COLOR_COLD_WAR;
  }

  for (let enemy of FACTIONS[y].relationships.enemies) {
    if (enemy !== FACTIONS[x].id) continue;
    return COLOR_ENEMY;
  }

  // x & y are both even
  if (x % 2 === 0 && y % 2 === 0) return COLOR_BACKGROUND_ALT;

  // x & y are both odd
  if (x % 2 && y % 2) return COLOR_BACKGROUND_ALT;

  return COLOR_BACKGROUND;
};
