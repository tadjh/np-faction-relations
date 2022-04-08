import { TimestampedFactionProps } from '../../types';
import {
  isBothOddOrBothEven,
  isBothTrue,
  isNotEqual,
  isStrictEqual,
} from '../../utils';
import {
  COLOR_ALLY,
  COLOR_ASSOCIATE,
  COLOR_BACKGROUND,
  COLOR_BACKGROUND_ALT,
  COLOR_BACKGROUND_LINE,
  COLOR_BACKGROUND_SPLIT,
  COLOR_COLD_WAR,
  COLOR_ENEMY,
  COLOR_FRIEND,
  COLOR_HAS_BENCH,
  COLOR_HAS_LAB,
  COLOR_HOT_WAR,
} from '../../config/constants';
import {
  getAllies,
  getAssociates,
  getColdWars,
  getEnemies,
  getFriends,
  getHasBench,
  getHasLab,
  getHotWars,
} from '../../hooks';

export const backgroundColor = (
  faction: TimestampedFactionProps,
  columnIndex: number,
  rowIndex: number,
  columnFactionId: string
): string => {
  if (isStrictEqual(columnIndex, rowIndex)) {
    const hasBench = getHasBench(faction);
    const hasLab = getHasLab(faction);

    if (isBothTrue(hasBench, hasLab)) return COLOR_BACKGROUND_SPLIT;

    if (hasBench) return COLOR_HAS_BENCH;

    if (hasLab) return COLOR_HAS_LAB;

    return COLOR_BACKGROUND_LINE;
  }

  for (let associate of getAssociates(faction)) {
    if (isNotEqual(associate, columnFactionId)) continue;
    return COLOR_ASSOCIATE;
  }

  for (let ally of getAllies(faction)) {
    if (isNotEqual(ally, columnFactionId)) continue;
    return COLOR_ALLY;
  }

  for (let friend of getFriends(faction)) {
    if (isNotEqual(friend, columnFactionId)) continue;
    return COLOR_FRIEND;
  }

  for (let cold of getColdWars(faction)) {
    if (isNotEqual(cold, columnFactionId)) continue;
    return COLOR_COLD_WAR;
  }

  for (let hot of getHotWars(faction)) {
    if (isNotEqual(hot, columnFactionId)) continue;
    return COLOR_HOT_WAR;
  }

  for (let enemy of getEnemies(faction)) {
    if (isNotEqual(enemy, columnFactionId)) continue;
    return COLOR_ENEMY;
  }

  if (isBothOddOrBothEven(columnIndex, rowIndex)) return COLOR_BACKGROUND_ALT;

  return COLOR_BACKGROUND;
};
