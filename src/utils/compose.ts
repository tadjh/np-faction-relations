import { Timestamp } from 'firebase/firestore';

export function composeTimestamp(lastUpdate: Timestamp) {
  return `Last updated ${lastUpdate.toDate().toString()}`;
}

export function composeCounterName(name: string) {
  return `counter-${name}`;
}

export function composeListItem(name: string, str: string) {
  return `list-item-${composeStringKey(name, str)}`;
}

function composeStringKey(name: string, str: string) {
  return `${name}-${str}`;
}

export function composeIndexKey(name: string, index: number) {
  return `${name}-${index + 1}`;
}

function composeIndexOrStringKey<T extends string>(
  name: T,
  id: number | string
) {
  if (typeof id === 'string') return composeStringKey(name, id);
  return composeIndexKey(name, id);
}

export function composeInputKey<T extends string>(
  name: T,
  id: number | string
) {
  return `input-${composeIndexOrStringKey(name, id)}`;
}

export function composeOptionKey<T extends string>(
  name: T,
  id: number | string
) {
  return `option-${composeIndexOrStringKey(name, id)}`;
}

export function composeSelectKey<T extends string>(
  name: T,
  id: number | string
) {
  return `select-${composeIndexOrStringKey(name, id)}`;
}

export function composeLabelKey<T extends string>(
  name: T,
  id: number | string
) {
  return `label-${composeIndexOrStringKey(name, id)}`;
}

export function composeIndexOfLength(index: number, length: number) {
  return `${index + 1} of ${length}`;
}

export function composePercentage(num: number) {
  return `${num}%`;
}

export function composeCSSCalc(str1: string, str2: string, operator: string) {
  return `calc(${str1} ${operator} ${str2})`;
}
