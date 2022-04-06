import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/np-logo-dark.png';
import { LOGO_ALT_TEXT, SITE_HEADER_TEXT } from '../../config/constants';

function Header() {
  return (
    <AnimatePresence>
      {logo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center gap-x-2 p-2 h-20"
        >
          <img src={logo} alt={LOGO_ALT_TEXT} width={160} />
          <span>{SITE_HEADER_TEXT}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Header;
