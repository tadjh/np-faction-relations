import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import logo from '../../assets/np-logo-dark.png';
import { LOGO_ALT_TEXT, SITE_HEADER_TEXT } from '../../config/strings';

const Header = forwardRef<HTMLDivElement>((_, ref) => (
  <AnimatePresence>
    {logo && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center gap-x-2 p-2.5 md:p-4 h-16 md:h-auto"
        ref={ref}
      >
        <img src={logo} alt={LOGO_ALT_TEXT} className="w-28 md:w-36" />
        <span className="text-xs md:text-base">{SITE_HEADER_TEXT}</span>
      </motion.div>
    )}
  </AnimatePresence>
));

export default Header;
