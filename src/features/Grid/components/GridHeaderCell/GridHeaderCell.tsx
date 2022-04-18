import clsx from 'clsx';
import { HTMLAttributes, RefObject } from 'react';
import { headerColor } from '../../config/styles';
import { composeShortName, useAuth } from '../../../../hooks';
import { TimestampedFaction } from '../../../../types';
import { faInfoCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEditor } from '../../../Editor/hooks';
import { useState } from 'react';
import GridHeaderTooltip from '../GridHeaderTooltip';
import {
  composeInfoId,
  composeEditLink,
  composeEditId,
} from '../../utils/compose';

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
  const [isTooltip, setIsTooltip] = useState(false);

  const hideTooltip = () => setIsTooltip(false);

  const toggleClick = () => {
    setIsTooltip((prevState) => !prevState);
  };

  const handleMouseLeave = () => hideTooltip();

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
      data-column={isRotated ? columnIndex : null}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GridHeaderTooltip
        isRotated={isRotated}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        isTooltip={isTooltip}
        faction={faction}
      />
      <div
        className="z-10 flex cursor-pointer items-center px-1 py-0.5 opacity-0 group-hover:opacity-100"
        onClick={toggleClick}
        id={composeInfoId(isRotated, columnIndex)}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
      <div className={clsx(isRotated && '-rotate-90')}>
        {composeShortName(faction)}
      </div>
      <div className="z-20 h-3 w-4 px-1 py-0.5">
        {showEditable && (
          <Link
            to={composeEditLink(factionId)}
            onClick={openEditor}
            className="opacity-0 hover:opacity-100 group-hover:opacity-100"
            id={composeEditId(isRotated, columnIndex)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default GridHeaderCell;
