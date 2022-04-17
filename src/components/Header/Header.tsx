import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/np-logo-dark.png';
import { LOGO_ALT_TEXT, SITE_HEADER_TEXT } from '../../config/strings';
import EditorLink from '../../features/Editor/components/EditorLink';
import NotesLink from '../../features/Notes/components/NotesLink';

function Header() {
  return (
    <header className="flex w-full flex-col gap-y-0.5">
      <div className="flex justify-between font-mono text-[8px]">
        <EditorLink />
        <NotesLink />
      </div>
      <AnimatePresence>
        {logo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-x-2"
          >
            <img src={logo} alt={LOGO_ALT_TEXT} className="w-28 md:w-36" />
            <span className="text-xs md:text-base">{SITE_HEADER_TEXT}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
