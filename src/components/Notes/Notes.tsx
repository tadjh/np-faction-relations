import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import CloseIcon from '../../assets/Icons';
import { LABEL_TEXT_NOTES } from '../../config/strings';
import text from './text';

const duration = 15000;
const scalar = 10000 / duration;

const transitionDuration = 150;

const variants = {
  enter: {
    x: 500,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: -500,
    opacity: 0,
  },
};

function Notes() {
  const [isVisible, setIsVisible] = useState(true);
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      setProgress(
        (prevProgress) => (prevProgress + deltaTime * 0.01 * scalar) % 100
      );
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      requestRef.current !== null && cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      if (isPaused) return clearInterval(interval);
      const timeout: NodeJS.Timer = setTimeout(() => {
        setProgress(0);
        slide === text.length - 1
          ? setSlide(0)
          : setSlide((prevSlide) => prevSlide + 1);
        requestRef.current = requestAnimationFrame(animate);
        return clearTimeout(timeout);
      }, transitionDuration);
    }, duration);

    return () => clearInterval(interval);
  }, [slide, isPaused, animate]);

  useEffect(() => {
    if (Math.round(progress) === 100)
      return () => {
        previousTimeRef.current = null;
        requestRef.current !== null && cancelAnimationFrame(requestRef.current);
      };
  }, [progress]);

  const handleOnMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    requestRef.current !== null && cancelAnimationFrame(requestRef.current);
    setIsPaused(true);
  };

  const handleOnMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    requestRef.current = requestAnimationFrame(animate);
    previousTimeRef.current = null;
    setProgress(0);
    setIsPaused(false);
  };

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);

  return (
    <>
      <div
        className={clsx(
          'absolute p-4 top-0 right-0 text-[8px] hover:underline',
          isVisible ? 'opacity-0' : 'opacity-100 cursor-pointer'
        )}
        onClick={handleOpen}
      >
        {LABEL_TEXT_NOTES}
      </div>
      {isVisible && (
        <div
          className="max-w-md min-w-md w-full fixed top-3 right-3 flex flex-col items-center"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <div className="bg-stone-700 text-white w-full cursor-pointer">
            <div className="flex justify-between items-center p-2">
              <span className="flex-1 flex justify-start">notes</span>
              <span className="text-xs flex flex-1 justify-center">{`${
                slide + 1
              } of ${text.length}`}</span>
              <button
                onClick={handleClose}
                className="text-base text-white flex-1 flex justify-end"
              >
                <CloseIcon />
              </button>
            </div>
            <div
              className="h-1 bg-stone-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="relative h-28 w-[452px] overflow-hidden flex justify-center">
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
                className="text-xs absolute max-w-md w-[448px] border-l border-b border-r p-2 shadow bg-white"
              >
                {text[slide]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}

export default Notes;
