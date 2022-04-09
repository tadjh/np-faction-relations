export const FIFTEEN_SECONDS_IN_MILLISECONDS = 15000;
export const TRANSITION_DURATION_IN_MILLISECONDS = 150;
export const SCALAR = 10000 / FIFTEEN_SECONDS_IN_MILLISECONDS;

export const variants = {
  enter: {
    x: 50,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: -50,
    opacity: 0,
  },
};
