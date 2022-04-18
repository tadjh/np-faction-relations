import { MouseEventHandler, RefObject, useRef } from 'react';
import { RESPONSIVE_BREAKPOINT } from '../../../config/constants';
import { useViewport } from '../../../hooks';

export function useHighlight(
  columnRefs: RefObject<HTMLDivElement>[],
  headerRefs: RefObject<HTMLDivElement>[]
) {
  const [viewportWidth] = useViewport();

  const isMobile = viewportWidth < RESPONSIVE_BREAKPOINT;

  const prevColumn = useRef<number | null>(null);

  const getColumnRef = (
    columnIndex: number,
    columnRefs: RefObject<HTMLDivElement>[]
  ) => columnRefs[columnIndex];

  const getHeaderRef = (
    columnIndex: number,
    headerRefs: RefObject<HTMLDivElement>[]
  ) => headerRefs[columnIndex];

  const setOpacity = (el: HTMLElement, value: string) =>
    (el.style['opacity'] = value);

  const setZIndex = (el: HTMLElement, value: string) =>
    (el.style['zIndex'] = value);

  const setTransform = (el: HTMLElement, value: string) =>
    (el.style['transform'] = value);

  const setBorderColor = (el: HTMLElement, value: string) =>
    (el.style['borderColor'] = value);

  const removeStyle = (el: HTMLElement, value: string) =>
    el.style.removeProperty(value);

  const showColumnRef = (column: RefObject<HTMLDivElement>) => {
    if (!column.current) return;
    setOpacity(column.current, '1');
    setZIndex(column.current, '1');
  };

  const hideColumnRef = (column: RefObject<HTMLDivElement>) => {
    if (!column.current) return;
    setOpacity(column.current, '0');
    setZIndex(column.current, 'initial');
  };

  const growHeaderRef = (
    header: RefObject<HTMLDivElement>,
    editIcon: HTMLElement | null,
    tooltipIcon: HTMLElement | null
  ) => {
    if (!header.current) return;
    const scale = isMobile ? 'scale(1.05)' : 'scale(1.10)';
    setZIndex(header.current, '30');
    setTransform(header.current, scale);
    setBorderColor(header.current, 'rgb(209 213 219)');
    if (editIcon) setOpacity(editIcon, '1');
    if (tooltipIcon) setOpacity(tooltipIcon, '1');
  };

  const shrinkHeaderRef = (
    header: RefObject<HTMLDivElement>,
    editIcon: HTMLElement | null,
    tooltipIcon: HTMLElement | null
  ) => {
    if (!header.current) return;
    removeStyle(header.current, 'z-index');
    removeStyle(header.current, 'transform');
    removeStyle(header.current, 'border-color');
    if (editIcon) removeStyle(editIcon, 'opacity');
    if (tooltipIcon) removeStyle(tooltipIcon, 'opacity');
  };

  const saveColumn = (columnIndex: number) =>
    (prevColumn.current = columnIndex);

  const deleteColumn = () => (prevColumn.current = null);

  const getEditIcon = (columnIndex: number) => {
    return document.getElementById(`column-header-cell-${columnIndex}-edit`);
  };

  const getTooltipIcon = (columnIndex: number) => {
    return document.getElementById(`column-header-cell-${columnIndex}-info`);
  };

  const getColumn = (currentTarget: EventTarget & HTMLDivElement): number =>
    parseInt(currentTarget.getAttribute('data-column') || '');

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    const columnIndex = getColumn(event.currentTarget);
    if (isNaN(columnIndex)) return;

    if (columnIndex !== prevColumn.current)
      handleForceLeave(prevColumn.current);

    const editIcon = getEditIcon(columnIndex);
    const tooltipIcon = getTooltipIcon(columnIndex);

    const column = getColumnRef(columnIndex, columnRefs);
    const header = getHeaderRef(columnIndex, headerRefs);
    showColumnRef(column);
    growHeaderRef(header, editIcon, tooltipIcon);
    saveColumn(columnIndex);
  };

  const handleForceLeave = (columnIndex: number | null) => {
    if (!columnIndex) return;
    const editIcon = getEditIcon(columnIndex);
    const tooltipIcon = getTooltipIcon(columnIndex);

    const column = getColumnRef(columnIndex, columnRefs);
    const header = getHeaderRef(columnIndex, headerRefs);
    hideColumnRef(column);
    shrinkHeaderRef(header, editIcon, tooltipIcon);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!prevColumn.current) return;
    handleForceLeave(prevColumn.current);
    deleteColumn();
  };
  return { handleMouseEnter, handleMouseLeave };
}
