import clsx from 'clsx';
import { DOMAttributes, RefObject } from 'react';
import {
  CELL_COLUMN_WIDTH,
  CELL_ROW_HEIGHT,
  HEADER_SIZE,
} from '../../config/constants';
import { headerColor } from '../../config/styles';
import { composeShortName, useAuth } from '../../../../hooks';
import { TimestampedFaction } from '../../../../types';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEditor } from '../../../Editor/hooks';

export interface GridHeaderCellProps extends DOMAttributes<HTMLDivElement> {
  rowIndex: number;
  columnIndex: number;
  faction: TimestampedFaction;
  factionId: string;
  isRotated?: boolean;
  headerRef?: RefObject<HTMLDivElement>;
}
function GridHeaderCell({
  rowIndex,
  columnIndex,
  faction,
  factionId,
  isRotated = false,
  headerRef,
  onMouseEnter: handleMouseEnter,
}: GridHeaderCellProps): JSX.Element {
  const { roles, canEdit } = useAuth();
  const { openEditor } = useEditor();
  const showEditable = canEdit(roles);
  return (
    <div
      ref={headerRef}
      className={clsx(
        'border text-center flex items-center justify-between relative group',
        'group-hover:scale-125 hover:scale-125 group-hover:z-10 hover:z-10 transition-transform',
        headerColor(isRotated ? columnIndex : rowIndex),
        isRotated
          ? 'border-b-gray-400 hover:border-b-gray-200 hover:-translate-y-1/8 py-2 flex-col'
          : 'border-r-gray-400 group-hover:border-r-gray-200 group-hover:-translate-x-1/8 px-2 flex-row'
      )}
    >
      <div
        id={`${isRotated ? 'column' : 'row'}-header-cell-${columnIndex}-shadow`}
        data-column={isRotated ? columnIndex : null}
        className={clsx(
          'absolute bg-gray-500 bg-opacity-5 hidden px-2 group-hover:block',
          isRotated ? 'top-0' : 'left-0'
        )}
        style={{
          width: isRotated ? CELL_COLUMN_WIDTH : HEADER_SIZE,
          height: isRotated ? HEADER_SIZE : CELL_ROW_HEIGHT,
        }}
        onMouseEnter={handleMouseEnter}
      />
      <div />
      <div className={clsx(isRotated && '-rotate-90')}>
        {composeShortName(faction)}
      </div>
      {showEditable && (
        <Link
          to={`/edit?factionId=${factionId}`}
          onClick={openEditor}
          className="opacity-0 group-hover:opacity-100 hover:opacity-100 block z-10"
          id={`${isRotated ? 'column' : 'row'}-header-cell-${columnIndex}-edit`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      )}
    </div>
  );
}

export default GridHeaderCell;
