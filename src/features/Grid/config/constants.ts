import { BASE_FONT_SIZE, BASE_SPACING } from '../../../config/constants';

const MULTIPLIER = 7;
export const CELL_COLUMN_WIDTH =
  (BASE_SPACING * MULTIPLIER) / BASE_FONT_SIZE + 'rem';
export const CELL_ROW_HEIGHT =
  (BASE_SPACING * (MULTIPLIER - 1)) / BASE_FONT_SIZE + 'rem';
export const HEADER_SIZE = '5.75rem';

export const COLOR_AFFILIATE = 'bg-lime-900';
export const COLOR_ALLY = 'bg-lime-600';
export const COLOR_FRIEND = 'bg-lime-300';
export const COLOR_HOT_WAR = 'bg-red-600';
export const COLOR_COLD_WAR = 'bg-cyan-500';
export const COLOR_ENEMY = 'bg-gray-700';
export const COLOR_HAS_BENCH = 'bg-amber-600';
export const COLOR_HAS_LAB = 'bg-red-300';
export const COLOR_BACKGROUND = 'bg-white';
export const COLOR_BACKGROUND_ALT = 'bg-gray-50';
export const COLOR_BACKGROUND_LINE = 'diagonal-line';
export const COLOR_BACKGROUND_SPLIT = 'diagonal-solid';

export const LABEL_TEXT_DETAILS = 'details';
