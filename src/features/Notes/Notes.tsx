import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { LABEL_TEXT_NOTES } from '../../config/strings';
import { variants } from './config';
import useNotes from './hooks/useNotes';
import text from './config/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../components/Inputs/IconButton';
import {
  faXmark,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

function Notes() {
  const {
    isOpen,
    slide,
    progress,
    handleOpen,
    handleClose,
    previous,
    next,
    handleOnMouseEnter,
    handleOnMouseLeave,
  } = useNotes(text.length);

  return (
    <>
      <div
        className={clsx(
          'absolute top-0 right-0 z-10 flex items-center gap-x-1 p-2.5 font-mono text-[8px] hover:underline md:p-4',
          isOpen ? 'opacity-0' : 'cursor-pointer opacity-100'
        )}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faNoteSticky} />
        {LABEL_TEXT_NOTES}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            dragMomentum={false}
            className="group absolute right-0 top-0 z-10 flex w-[416px] max-w-full flex-col items-center p-2.5 font-mono md:p-4"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <div className="w-full cursor-pointer bg-gray-700 text-white">
              <div className="flex items-center justify-between p-2">
                <span className="flex flex-1 justify-start">
                  {LABEL_TEXT_NOTES}
                </span>
                <span className="flex-2 flex items-center justify-center gap-x-2 text-xs">
                  <IconButton
                    onClick={previous}
                    icon={faArrowLeft}
                    className="px-2.5 py-1.5 opacity-0 group-hover:opacity-100"
                  />
                  {`${slide + 1} of ${text.length}`}
                  <IconButton
                    onClick={next}
                    icon={faArrowRight}
                    className="px-2.5 py-1.5 opacity-0 group-hover:opacity-100"
                  />
                </span>
                <span className="flex-1 text-right text-white">
                  <IconButton onClick={handleClose} icon={faXmark} />
                </span>
              </div>
              <div
                className="h-1 bg-gray-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="relative flex w-[378px] justify-center md:w-[392px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-[370px] border-l border-b border-r bg-white p-2 text-xs shadow-2xl md:w-[384px]"
                >
                  {text[slide]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Notes;
