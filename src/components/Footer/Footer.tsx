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
  const { updated } = useFactions();
  return (
    <div className="flex gap-x-2 text-[8px] justify-between w-full" ref={ref}>
      <div>
        {IS_DEVELOPMENT ? PROJECT_ID : DOMAIN_NAME}
        {IS_DEVELOPMENT && ` (${NODE_ENV})`}
      </div>
      <div className="text-right">
        {!!updated && `Last updated ${dateToString(updated)}`}
      </div>
    </div>
  );
});

export default Footer;
