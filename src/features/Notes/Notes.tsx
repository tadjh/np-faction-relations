import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from '../../assets/Icons';
import { LABEL_TEXT_NOTES } from '../../config/strings';
import { variants } from './config';
import useNotes from './hooks/useNotes';
import text from './text';

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
          'absolute p-2.5 md:p-4 top-0 right-0 text-[8px] hover:underline font-mono z-10',
          isOpen ? 'opacity-0' : 'opacity-100 cursor-pointer'
        )}
        onClick={handleOpen}
      >
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
            className="max-w-full w-[416px] absolute right-0 top-0 p-2.5 md:p-4 flex flex-col items-center group font-mono z-10"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <div className="bg-gray-700 text-white w-full cursor-pointer">
              <div className="flex justify-between items-center p-2">
                <span className="flex-1 flex justify-start">
                  {LABEL_TEXT_NOTES}
                </span>
                <span className="text-xs flex flex-2 items-center justify-center gap-x-2">
                  <span
                    className="opacity-0 group-hover:opacity-100 cursor-pointer hover:underline px-2.5 py-1.5"
                    onClick={previous}
                  >
                    &larr;
                  </span>
                  {`${slide + 1} of ${text.length}`}
                  <span
                    className="opacity-0 group-hover:opacity-100 cursor-pointer hover:underline px-2.5 py-1.5"
                    onClick={next}
                  >
                    &rarr;
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-base text-white flex-1 flex justify-end"
                >
                  <CloseIcon />
                </button>
              </div>
              <div
                className="h-1 bg-gray-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="relative w-[378px] md:w-[392px] flex justify-center">
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
                  className="text-xs absolute w-[370px] md:w-[384px] border-l border-b border-r p-2 shadow-2xl bg-white"
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
