import { RelationalFaction } from '../classes';
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
  FACTIONS: RelationalFaction[],
  x: number,
  y: number
): string => {
  if (x === y) {
    if (FACTIONS[x].hasBench === true) return COLOR_HAS_BENCH;
    return 'diagonal-line';
  }

  for (let associate of FACTIONS[y].associates) {
    if (associate.id !== FACTIONS[x].id) continue;
    return COLOR_ASSOCIATE;
  }

  for (let ally of FACTIONS[y].allies) {
    if (ally.id !== FACTIONS[x].id) continue;
    return COLOR_ALLY;
  }

  for (let friend of FACTIONS[y].friends) {
    if (friend.id !== FACTIONS[x].id) continue;
    return COLOR_FRIEND;
  }

  for (let hot of FACTIONS[y].hotWar) {
    if (hot.id !== FACTIONS[x].id) continue;
    return COLOR_HOT_WAR;
  }

  for (let cold of FACTIONS[y].coldWar) {
    if (cold.id !== FACTIONS[x].id) continue;
    return COLOR_COLD_WAR;
  }

  for (let enemy of FACTIONS[y].enemies) {
    if (enemy.id !== FACTIONS[x].id) continue;
    return COLOR_ENEMY;
  }

  // x & y are both even
  if (x % 2 === 0 && y % 2 === 0) return COLOR_BACKGROUND_ALT;

  // x & y are both odd
  if (x % 2 && y % 2) return COLOR_BACKGROUND_ALT;

  return COLOR_BACKGROUND;
};
