import { useEffect, MutableRefObject, useRef, useState } from 'react';
import { BASE_SPACING, RESPONSIVE_BREAKPOINT } from '../../../config/constants';
import { getAbsDifference } from '../../../utils';

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

    hasConstraints.current = true;
    setConstraints((prevState) => ({
      ...prevState,
      left,
      top,
      bottom,
      right,
    }));
  });

  return { gridRef, constraints };
}
