import {
  COLOR_BACKGROUND_SPLIT,
  COLOR_HAS_BENCH,
  COLOR_HAS_LAB,
  COLOR_BACKGROUND_LINE,
  COLOR_ASSOCIATE,
  COLOR_ALLY,
  COLOR_FRIEND,
  COLOR_COLD_WAR,
  COLOR_HOT_WAR,
  COLOR_ENEMY,
  COLOR_BACKGROUND_ALT,
  COLOR_BACKGROUND,
} from '../../../config/constants';
import {
  getHasBench,
  getHasLab,
  getAssociates,
  getAllies,
  getFriends,
  getColdWars,
  getHotWars,
  getEnemies,
} from '../../../hooks';
import { TimestampedFactionProps } from '../../../types';
import {
  isStrictEqual,
  isBothTrue,
  isNotEqual,
  isBothOddOrBothEven,
} from '../../../utils';

export interface BackgroundColorProps {
  faction: TimestampedFactionProps;
  columnIndex: number;
  rowIndex: number;
  columnFactionId: string;
}

export function useStyles() {
  function backgroundColor({
    faction,
    columnIndex,
    rowIndex,
    columnFactionId,
  }: BackgroundColorProps): string {
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
  }

  return { backgroundColor };
}
