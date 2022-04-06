import { TimestampedFactionProps } from '../types';
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
  faction: TimestampedFactionProps,
  x: number,
  y: number,
  xId: string
): string => {
  if (x === y) {
    if (faction.attributes.hasBench && faction.attributes.hasLab)
      return 'diagonal-solid';
    if (faction.attributes.hasBench) return COLOR_HAS_BENCH;
    return 'diagonal-line';
  }

  for (let associate of faction.relationships.associates.data) {
    if (associate !== xId) continue;
    return COLOR_ASSOCIATE;
  }

  for (let ally of faction.relationships.allies.data) {
    if (ally !== xId) continue;
    return COLOR_ALLY;
  }

  for (let friend of faction.relationships.friends.data) {
    if (friend !== xId) continue;
    return COLOR_FRIEND;
  }

  for (let hot of faction.relationships.hotWar.data) {
    if (hot !== xId) continue;
    return COLOR_HOT_WAR;
  }

  for (let cold of faction.relationships.coldWar.data) {
    if (cold !== xId) continue;
    return COLOR_COLD_WAR;
  }

  for (let enemy of faction.relationships.enemies.data) {
    if (enemy !== xId) continue;
    return COLOR_ENEMY;
  }

  // x & y are both even
  if (x % 2 === 0 && y % 2 === 0) return COLOR_BACKGROUND_ALT;

  // x & y are both odd
  if (x % 2 && y % 2) return COLOR_BACKGROUND_ALT;

  return COLOR_BACKGROUND;
};
