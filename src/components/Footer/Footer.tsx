import {
  PROJECT_ID,
  NODE_ENV,
  IS_DEVELOPMENT,
  PORT,
  DOMAIN_NAME,
} from '../../config/environment';
import { useFactions } from '../../hooks';
import { dateToString } from '../../utils';

function Footer() {
  const { updated } = useFactions();
  return (
    <div className="flex gap-x-2 text-[8px] p-2 w-full justify-between h-7">
      <div>
        {DOMAIN_NAME}
        {IS_DEVELOPMENT && `:${PORT} ${PROJECT_ID} (${NODE_ENV})`}
      </div>
      <div>{!!updated && `Last updated ${dateToString(updated)}`}</div>
    </div>
  );
}

export default Footer;
