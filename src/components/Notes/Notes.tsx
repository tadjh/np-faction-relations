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

const duration = 15000;
const scalar = 10000 / duration;

const text = [
  "This chart is made from an HOA viewer's perspective with help from the nopixel wiki which may be outdated.",
  "I loosely placed common allies near one another. In doing so, it revealed that alliances seem to congregate around weapons benches. In hindsight this should've been obvoius to me.",
  "Interestingly Speedy's students Siz (HOA) and Benji (SS) both have similar looking heat maps to ESV, branching wide across many factions. These three group also hold the record for most active allies. HOA: 10, ESV: 9, SS: 7.",
  'By contrast CG & CB members have multiple sub-groups within their main factions creating strong internal alliances.',
  'SS appears to be putting in the most ground work involving the newer up and coming factions ie. JustUs, Ballas (This faction is not SSB or ESB).',
  'The CG x HOA alliance has proven to be the most dense region of the chart. This may change as SS is slowly being pulled into the Cerebus x CB x ESV orbit.',
  'The PD & Ballas seem to incur the most conflict and maintain long lasting rivals. The HOA appears to be the only group that is consistently friendly with PD.',
  "Olga, while not being a faction seems significant due to her bench. This is the only bench that isn't backed by a single faction. The middlemen have long revolved around the orbit of Hydra, Angels and HOA. This is why Hydra, Angels and HOA are near one another despite the recent tensions between the three groups.",
  "CG appears to be the only faction that owns/controls two benches although before the SS (Michael Simone's bench) & ESV split, ESV controlled two benches as well. The HOA x Lost bench is the only one that shares blueprints so I placed those benches near one another.",
  "I intentionally left out some up and coming groups like RM & BCF. I don't have enough data on these groups to justify adding them.",
];

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
          'absolute p-4 top-0 right-0 text-[8px] underline',
          isVisible ? 'opacity-0' : 'opacity-100 cursor-pointer'
        )}
        onClick={handleOpen}
      >
        notes
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
                  duration: 2,
                }}
                className="text-xs absolute max-w-md w-[448px] border-l border-b border-r p-2 shadow"
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
