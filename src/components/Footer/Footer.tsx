import { forwardRef } from 'react';
import {
  PROJECT_ID,
  NODE_ENV,
  IS_DEVELOPMENT,
  DOMAIN_NAME,
} from '../../config/environment';
import { useFactions } from '../../hooks';
import { dateToString } from '../../utils';

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const { lastUpdate } = useFactions();
  return (
    <div className="flex w-full justify-between gap-x-2 text-[8px]" ref={ref}>
      <div>
        {IS_DEVELOPMENT ? PROJECT_ID : DOMAIN_NAME}
        {IS_DEVELOPMENT && ` (${NODE_ENV})`}
      </div>
      <div className="text-right">
        {!!lastUpdate && `Last updated ${dateToString(lastUpdate)}`}
      </div>
    </div>
  );
});

export default Footer;
