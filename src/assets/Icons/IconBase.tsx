import { SVGAttributes } from 'react';

export function IconBase({
  children,
  viewBox,
  className,
}: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox || '0 0 50 50'}
      className={className || 'w-4 h-4'}
    >
      {children}
    </svg>
  );
}
