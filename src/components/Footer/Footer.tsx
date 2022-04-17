import { AnimatePresence, motion } from 'framer-motion';
import {
  DOMAIN_NAME,
  IS_DEVELOPMENT,
  PROJECT_ID,
} from '../../config/environment';
import { useFactions } from '../../hooks';
import { dateToString } from '../../utils';

function Footer() {
  const { lastUpdate } = useFactions();
  return (
    <AnimatePresence>
      {!!lastUpdate && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex w-full flex-shrink-0 flex-grow-0 basis-auto justify-center text-[8px] md:justify-between md:gap-x-2"
        >
          <div>{IS_DEVELOPMENT ? PROJECT_ID : DOMAIN_NAME}</div>
          <div className="text-right">
            {`Last updated ${dateToString(lastUpdate)}`}
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}

export default Footer;
