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
  factions: HydratedFactionProps[],
  x: number,
  y: number
): string => {
  if (x === y) {
    if (factions[x].attributes.hasBench === true) return COLOR_HAS_BENCH;
    return 'diagonal-line';
  }

  for (let associate of factions[y].relationships.associates.data) {
    if (associate !== factions[x].id) continue;
    return COLOR_ASSOCIATE;
  }

  for (let ally of factions[y].relationships.allies.data) {
    if (ally !== factions[x].id) continue;
    return COLOR_ALLY;
  }

  for (let friend of factions[y].relationships.friends.data) {
    if (friend !== factions[x].id) continue;
    return COLOR_FRIEND;
  }

  for (let hot of factions[y].relationships.hotWar.data) {
    if (hot !== factions[x].id) continue;
    return COLOR_HOT_WAR;
  }

  for (let cold of factions[y].relationships.coldWar.data) {
    if (cold !== factions[x].id) continue;
    return COLOR_COLD_WAR;
  }

  for (let enemy of factions[y].relationships.enemies.data) {
    if (enemy !== factions[x].id) continue;
    return COLOR_ENEMY;
  }

  // x & y are both even
  if (x % 2 === 0 && y % 2 === 0) return COLOR_BACKGROUND_ALT;

  // x & y are both odd
  if (x % 2 && y % 2) return COLOR_BACKGROUND_ALT;

  return COLOR_BACKGROUND;
};
