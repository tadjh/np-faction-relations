import {
  HEADER_SIZE,
  CELL_COLUMN_WIDTH,
  CELL_ROW_HEIGHT,
} from '../config/constants';

export function composeRowKey(factionId: string) {
  return `row-${factionId}`;
}

export function composeCellKey(rowIndex: number, columnIndex: number) {
  return `row-${rowIndex}-col-${columnIndex}`;
}

export function composeGridColumns(length: number) {
  return `${HEADER_SIZE} repeat(${length},${CELL_COLUMN_WIDTH})`;
}

export function composeGridRows(length: number) {
  return `${HEADER_SIZE} repeat(${length},${CELL_ROW_HEIGHT})`;
}

export function composeEditLink(factionId: string) {
  return `/edit?factionId=${factionId}`;
}

function composeCellId(columnIndex: number) {
  return `cell-${columnIndex}`;
}

function composeHeaderCellId(columnIndex: number) {
  return `header-${composeCellId(columnIndex)}`;
}

function composeColumnOrRowHeaderCellId(
  isRotated: boolean,
  columnIndex: number
) {
  return `${isRotated ? 'column' : 'row'}-${composeHeaderCellId(columnIndex)}`;
}

export function composeInfoId(isRotated: boolean, columnIndex: number) {
  return `${composeColumnOrRowHeaderCellId(isRotated, columnIndex)}-info`;
}

export function composeEditId(isRotated: boolean, columnIndex: number) {
  return `${composeColumnOrRowHeaderCellId(isRotated, columnIndex)}-edit`;
}
