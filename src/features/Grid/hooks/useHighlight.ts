import { MouseEventHandler, RefObject, useRef } from 'react';

export function useHighlight(columnRefs: RefObject<HTMLDivElement>[]) {
  const prevColumn = useRef<number | null>(null);

  const getColumnRef = (
    columnIndex: number,
    columnRefs: RefObject<HTMLDivElement>[]
  ) => columnRefs[columnIndex];

  const setOpacity = (el: HTMLDivElement, value: string) =>
    (el.style['opacity'] = value);

  const setZIndex = (el: HTMLDivElement, value: string) =>
    (el.style['zIndex'] = value);

  const showColumnRef = (column: RefObject<HTMLDivElement>) => {
    if (!column.current) return;
    setOpacity(column.current, '1');
    setZIndex(column.current, '1');
    column.current.style['zIndex'] = '1';
  };

  const hideColumnRef = (column: RefObject<HTMLDivElement>) => {
    if (!column.current) return;
    setOpacity(column.current, '0');
    setZIndex(column.current, 'initial');
  };

  const saveColumn = (columnIndex: number) =>
    (prevColumn.current = columnIndex);

  const deleteColumn = () => (prevColumn.current = null);

  const getColumn = (currentTarget: EventTarget & HTMLDivElement): number =>
    parseInt(currentTarget.getAttribute('data-column') || '');

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    const columnIndex = getColumn(event.currentTarget);
    if (isNaN(columnIndex)) return;

    if (columnIndex !== prevColumn.current)
      handleForceLeave(prevColumn.current);

    const column = getColumnRef(columnIndex, columnRefs);
    showColumnRef(column);
    saveColumn(columnIndex);
  };

  const handleForceLeave = (columnIndex: number | null) => {
    if (!columnIndex) return;
    const column = getColumnRef(columnIndex, columnRefs);
    hideColumnRef(column);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    console.log('leaving', event.currentTarget);

    if (!prevColumn.current) return;
    handleForceLeave(prevColumn.current);
    deleteColumn();
  };
  return { handleMouseEnter, handleMouseLeave };
}
