import { useEffect, MutableRefObject, useRef, useState } from 'react';
import {
  BASE_SPACING,
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
  RESPONSIVE_BREAKPOINT,
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
  getAbsDifference,
  isBothOddOrBothEven,
  isBothTrue,
  isNotEqual,
  isStrictEqual,
} from '../../../utils';

type Constraint = 'bottom' | 'top' | 'left' | 'right';

type Constraints = {
  [key in Constraint]: number | undefined;
};

export function useGrid(
  headerRef: MutableRefObject<HTMLDivElement | null>,
  footerRef: MutableRefObject<HTMLDivElement | null>
) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [constraints, setConstraints] = useState<Constraints>({
    bottom: undefined,
    top: undefined,
    left: undefined,
    right: undefined,
  });

  const hasConstraints = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (hasConstraints.current) return;
    if (!gridRef.current) return;

    const getViewportWidth = () => {
      return window.innerWidth;
    };

    const getViewportHeight = () => {
      return window.innerHeight;
    };

    const getDimensions = (ref: MutableRefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      return ref.current.getBoundingClientRect();
    };

    const getPadding = () => {
      return getViewportWidth() > RESPONSIVE_BREAKPOINT
        ? BASE_SPACING * 2.5
        : BASE_SPACING * 4;
    };

    const getDistanceFromEdge = (difference: number | undefined) => {
      if (!difference) return undefined;
      return difference / 2;
    };

    const getVerticalConstraint = (
      verticalDifference: number | undefined,
      padding = 0,
      offset = 0,
      flipSign = false
    ) => {
      if (!verticalDifference) return undefined;
      const verticalConstraint = verticalDifference - (padding + offset);
      return flipSign ? -verticalConstraint : verticalConstraint;
    };

    const getDifference = (viewportSize: number, boxSize?: number) => {
      if (!boxSize) return undefined;
      return getAbsDifference(viewportSize, boxSize);
    };

    const getHorizontalConstraint = (
      horizontalDifference: number | undefined,
      padding = 0,
      flipSign = false
    ) => {
      if (!horizontalDifference) return undefined;
      const horizontalConstraint = horizontalDifference + padding * 2;
      return flipSign ? -horizontalConstraint : horizontalConstraint;
    };

    const viewportHeight = getViewportHeight();
    const viewportWidth = getViewportWidth();
    const dimensions = getDimensions(gridRef);
    const boxWidth = dimensions?.width;

    const verticalDifference = getDifference(
      viewportHeight,
      dimensions?.height
    );
    const horizontalDifference = getDifference(viewportWidth, boxWidth);
    const verticalDistanceFromEdge = getDistanceFromEdge(verticalDifference);
    const horizontalDistanceFromEdge =
      getDistanceFromEdge(horizontalDifference);

    const padding = getPadding();

    const bottom = getVerticalConstraint(
      verticalDistanceFromEdge,
      padding * 2,
      footerRef.current?.offsetHeight
    );

    const top = getVerticalConstraint(
      verticalDistanceFromEdge,
      padding,
      headerRef.current?.offsetHeight,
      true
    );

    const left =
      (boxWidth || 0) < viewportWidth
        ? getHorizontalConstraint(horizontalDistanceFromEdge, -padding, true)
        : getHorizontalConstraint(horizontalDifference, padding, true);

    const right =
      (boxWidth || 0) < viewportWidth
        ? getHorizontalConstraint(horizontalDistanceFromEdge, -padding)
        : 0;

    console.log(
      verticalDistanceFromEdge,
      footerRef.current?.offsetHeight,
      padding
    );

    hasConstraints.current = true;
    setConstraints((prevState) => ({
      ...prevState,
      left,
      top,
      bottom,
      right,
    }));
  });

  const backgroundColor = (
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

  return { gridRef, constraints, backgroundColor };
}
