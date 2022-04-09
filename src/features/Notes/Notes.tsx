import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CloseIcon } from '../../assets/Icons';
import { LABEL_TEXT_NOTES } from '../../config/strings';
import text from './text';

const FIFTEEN_SECONDS_IN_MILLISECONDS = 15000;
const scalar = 10000 / FIFTEEN_SECONDS_IN_MILLISECONDS;

const TRANSITION_DURATION_IN_MILLISECONDS = 150;

const variants = {
  enter: {
    x: 50,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: -50,
    opacity: 0,
  },
};

function Notes() {
  const [isVisible, setIsVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current) {
      const deltaTime = time - previousTimeRef.current;
      setProgress(
        (prevProgress) => (prevProgress + deltaTime * 0.01 * scalar) % 100
      );
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  const cancel = (handle: number | null) => {
    if (handle === null) return;
    cancelAnimationFrame(handle);
  };

  useEffect(() => {
    if (!isVisible) return;
    requestRef.current = requestAnimationFrame(animate);
    return () => cancel(requestRef.current);
  }, [isVisible, animate]);

  const increment = useCallback(() => {
    slide === text.length - 1
      ? setSlide(0)
      : setSlide((prevSlide) => prevSlide + 1);
  }, [slide]);

  const decrement = useCallback(() => {
    slide === 0
      ? setSlide(text.length - 1)
      : setSlide((prevSlide) => prevSlide - 1);
  }, [slide]);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      if (isPaused) return clearInterval(interval);

      const timeout: NodeJS.Timer = setTimeout(() => {
        setProgress(0);
        increment();
        requestRef.current = requestAnimationFrame(animate);
        return clearTimeout(timeout);
      }, TRANSITION_DURATION_IN_MILLISECONDS);
    }, FIFTEEN_SECONDS_IN_MILLISECONDS);

    return () => clearInterval(interval);
  }, [isPaused, animate, increment]);

  useEffect(() => {
    if (Math.round(progress) === 100)
      return () => {
        previousTimeRef.current = null;
        cancel(requestRef.current);
      };
  }, [progress]);

  const handleOnMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsPaused(true);
    cancel(requestRef.current);
  };

  const handleOnMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    previousTimeRef.current = null;
    setProgress(0);
    setIsPaused(false);
    requestRef.current = requestAnimationFrame(animate);
  };

  const handleOpen = () => setIsVisible(true);

  const handleClose = () => setIsVisible(false);

  const reset = () => {
    previousTimeRef.current = null;
    setProgress(0);
    setIsPaused(false);
    requestRef.current = requestAnimationFrame(animate);
  };

  const previous = () => {
    decrement();
    reset();
  };

  const next = () => {
    increment();
    reset();
  };

  return (
    <>
      <div
        className={clsx(
          'absolute p-2.5 md:p-4 top-0 right-0 text-[8px] hover:underline font-mono z-10',
          isVisible ? 'opacity-0' : 'opacity-100 cursor-pointer'
        )}
        onClick={handleOpen}
      >
        {LABEL_TEXT_NOTES}
      </div>
      {isVisible && (
        <div
          className="max-w-full w-[416px] absolute right-0 top-0 p-2.5 md:p-4 flex flex-col items-center group font-mono z-10"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <div className="bg-gray-700 text-white w-full cursor-pointer">
            <div className="flex justify-between items-center p-2">
              <span className="flex-1 flex justify-start">
                {LABEL_TEXT_NOTES}
              </span>
              <span className="text-xs flex flex-1 justify-center gap-x-2">
                <span
                  className="opacity-0 group-hover:opacity-100 cursor-pointer hover:underline"
                  onClick={previous}
                >
                  &larr;
                </span>
                {`${slide + 1} of ${text.length}`}{' '}
                <span
                  className="opacity-0 group-hover:opacity-100 cursor-pointer hover:underline"
                  onClick={next}
                >
                  &rarr;
                </span>
              </span>
              <button
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
        </div>
      )}
    </>
  );
}

export default Notes;
