import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { DOMAttributes } from 'react';
import {
  composeLabeledFullName,
  composeWebsiteLabel,
  getWebsite,
  getWebsites,
} from '../../../../hooks';
import { TimestampedFaction, Website } from '../../../../types';
import { composeCSSCalc, composeIndexKey } from '../../../../utils/compose';
import {
  CELL_COLUMN_WIDTH,
  CELL_ROW_HEIGHT,
  LABEL_TEXT_DETAILS,
} from '../../config/constants';
import { headerColor } from '../../config/styles';

interface GridHeaderTooltipProps extends DOMAttributes<HTMLDivElement> {
  isRotated: boolean;
  columnIndex: number;
  rowIndex: number;
  isTooltip: boolean;
  faction: TimestampedFaction;
}

function GridHeaderTooltip({
  isRotated,
  columnIndex,
  rowIndex,
  isTooltip,
  faction,
}: GridHeaderTooltipProps) {
  const websites = getWebsites(faction);
  return (
    <div
      className={clsx(
        headerColor(isRotated ? columnIndex : rowIndex),
        'absolute box-border flex flex-col gap-y-2 border border-gray-300 p-2 text-left opacity-0 group-hover:opacity-100',
        isTooltip ? 'block' : 'hidden'
      )}
      style={{
        left: isRotated
          ? composeCSSCalc(CELL_COLUMN_WIDTH, '2px', '-')
          : '-1px',
        top: isRotated ? '-1px' : composeCSSCalc(CELL_ROW_HEIGHT, '2px', '-'),
      }}
    >
      <div>{LABEL_TEXT_DETAILS}</div>
      <hr></hr>
      <div className="whitespace-nowrap">{composeLabeledFullName(faction)}</div>
      <div className="flex flex-col">
        {Object.keys(websites).map((website, index) => {
          const url = getWebsite(faction, website as Website);
          if (url === '') return null;
          return (
            <div
              className="flex gap-x-2 whitespace-nowrap"
              key={composeIndexKey('website', index)}
            >
              <span>{composeWebsiteLabel(website)}</span>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-x-2 hover:underline"
              >
                {url}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GridHeaderTooltip;
