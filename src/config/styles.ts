import { COLOR_BACKGROUND, COLOR_BACKGROUND_ALT } from './constants';

export const headerColor = (index = 1) =>
  index % 2 ? COLOR_BACKGROUND_ALT : COLOR_BACKGROUND;
