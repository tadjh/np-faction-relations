import {
  MutableRefObject,
  useRef,
  useState,
  useEffect,
  RefObject,
} from 'react';
import { BASE_SPACING, RESPONSIVE_BREAKPOINT } from '../../../config/constants';
import { useViewport } from '../../../hooks';

type Constraint = 'bottom' | 'top' | 'left' | 'right';

type Constraints = {
  [key in Constraint]: number | undefined;
};

function getDimensions(ref: MutableRefObject<HTMLDivElement | null>) {
  if (!ref.current) return undefined;
  return ref.current.getBoundingClientRect();
}

function getPadding(isMobile: boolean) {
  return isMobile ? BASE_SPACING * 2.5 : BASE_SPACING * 4;
}

function getLeftDist(dimensions?: DOMRect) {
  return dimensions?.left;
}

function getRightDist(viewportWidth: number, dimensions?: DOMRect) {
  if (dimensions?.right === undefined) return undefined;
  return viewportWidth - dimensions.right;
}

function getTopDist(dimensions?: DOMRect) {
  return dimensions?.top;
}

function getBottomDist(viewportHeight: number, dimensions?: DOMRect) {
  if (dimensions?.bottom === undefined) return undefined;
  return viewportHeight - dimensions.bottom;
}

function getHeightDist(dimensions?: DOMRect) {
  return dimensions?.height;
}

function getHeight(ref: RefObject<HTMLDivElement | null>) {
  const dimensions = getDimensions(ref);
  const height = getHeightDist(dimensions);
  return height || 0;
}

function getDistances(
  viewportWidth: number,
  viewportHeight: number,
  dimensions?: DOMRect
): Constraints | undefined {
  const left = getLeftDist(dimensions);
  const top = getTopDist(dimensions);
  const bottom = getBottomDist(viewportHeight, dimensions);
  const right = getRightDist(viewportWidth, dimensions);
  if (
    left === undefined &&
    top === undefined &&
    bottom === undefined &&
    right === undefined
  )
    return undefined;
  return { left, top, bottom, right };
}

function getInversions(
  isMobile: boolean,
  constraints?: Constraints
): Constraints | undefined {
  if (constraints === undefined) return undefined;
  const left = isMobile ? constraints.right : constraints.left;
  const top = isMobile ? constraints.bottom : constraints.top;
  const bottom = isMobile ? constraints.top : constraints.bottom;
  const right = isMobile ? constraints.left : constraints.right;
  if (
    left === undefined &&
    top === undefined &&
    bottom === undefined &&
    right === undefined
  )
    return undefined;
  return { left, top, bottom, right };
}

function getNormal(isMobile: boolean, num?: number, skip?: boolean) {
  if (num === undefined) return undefined;
  if (skip) return -num;
  return isMobile ? num : -num;
}

function getNormals(
  isMobile: boolean,
  constraints?: Constraints
): Constraints | undefined {
  if (constraints === undefined) return undefined;
  const left = getNormal(isMobile, constraints.left);
  const top = getNormal(isMobile, constraints.top, true);
  const bottom = constraints.bottom;
  const right = getNormal(!isMobile, constraints.right);
  if (
    left === undefined &&
    top === undefined &&
    bottom === undefined &&
    right === undefined
  )
    return undefined;
  return { left, top, bottom, right };
}

function getLeftPad(isMobile: boolean, padding: number, num?: number) {
  if (num === undefined) return undefined;
  return isMobile ? num - padding : num + padding;
}

function getTopPad(
  isMobile: boolean,
  headerSize: number,
  padding: number,
  num?: number
) {
  if (num === undefined) return undefined;
  return isMobile ? headerSize + num - padding : headerSize + num + padding;
}

function getBottomPad(footerSize: number, padding: number, num?: number) {
  if (num === undefined) return undefined;
  return num - padding - footerSize;
}

function getRightPad(isMobile: boolean, padding: number, num?: number) {
  if (num === undefined) return undefined;
  return isMobile ? num + padding : num - padding;
}

function getPads(
  isMobile: boolean,
  padding: number,
  headerSize: number,
  footerSize: number,
  constraints?: Constraints
): Constraints | undefined {
  if (constraints === undefined) return undefined;
  const left = getLeftPad(isMobile, padding, constraints.left);
  const top = getTopPad(isMobile, headerSize, padding, constraints.top);
  const bottom = getBottomPad(footerSize, padding, constraints.bottom);
  const right = getRightPad(isMobile, padding, constraints.right);
  return { left, top, bottom, right };
}

export function useGrid(
  headerRef: MutableRefObject<HTMLDivElement | null>,
  footerRef: MutableRefObject<HTMLDivElement | null>
) {
  const [viewportWidth, viewportHeight] = useViewport();
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [constraints, setConstraints] = useState<Constraints | undefined>(
    undefined
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (constraints) return;
    if (!gridRef.current) return;

    const isMobile = viewportWidth < RESPONSIVE_BREAKPOINT;

    const padding = getPadding(isMobile);
    const headerSize = getHeight(headerRef);
    const footerSize = getHeight(footerRef);

    const dimensions = getDimensions(gridRef);

    const distances = getDistances(viewportWidth, viewportHeight, dimensions);
    const inverted = getInversions(isMobile, distances);
    const normals = getNormals(isMobile, inverted);
    const padded = getPads(isMobile, padding, headerSize, footerSize, normals);

    const nextConstraints = padded;

    setConstraints(nextConstraints);
  });

  return { gridRef, constraints };
}
