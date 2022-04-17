import clsx from 'clsx';
import { DOMAttributes, HTMLAttributes, RefObject } from 'react';
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

export interface GridHeaderCellProps extends HTMLAttributes<HTMLDivElement> {
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
  className,
  onMouseEnter: handleMouseEnter,
}: GridHeaderCellProps): JSX.Element {
  const { roles, canEdit } = useAuth();
  const { openEditor } = useEditor();
  const showEditable = canEdit(roles);
  return (
    <div
      ref={headerRef}
      className={clsx(
        headerColor(isRotated ? columnIndex : rowIndex),
        'group sticky z-20 flex border-collapse items-center justify-between border text-center transition-transform hover:z-30 hover:scale-105 group-hover:z-30 group-hover:scale-105 md:hover:scale-110 md:group-hover:scale-110',
        isRotated
          ? 'top-0 origin-bottom flex-col border-y-gray-400 py-2 hover:border-x-gray-200'
          : 'left-0 origin-right flex-row border-x-gray-400 px-2 group-hover:border-x-gray-200',
        className
      )}
    >
      <div
        id={`${isRotated ? 'column' : 'row'}-header-cell-${columnIndex}-shadow`}
        data-column={isRotated ? columnIndex : null}
        className={clsx(
          'absolute hidden bg-gray-500 bg-opacity-5 px-2 group-hover:block',
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
          className="z-20 block opacity-0 hover:opacity-100 group-hover:opacity-100"
          id={`${isRotated ? 'column' : 'row'}-header-cell-${columnIndex}-edit`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      )}
    </div>
  );
}

export default GridHeaderCell;
