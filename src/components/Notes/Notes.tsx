import clsx from 'clsx';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

const duration = 15000;

const text = [
  "This chart is made from an HOA viewer's perspective with help from the nopixel wiki which may be outdated.",
  "I loosely placed common allies near one another. In doing so, it revealed that alliances seem to congregate around weapons benches. In hindsight this should've been obvoius to me.",
  "Interestingly Speedy's students Siz (HOA) and Benji (SS) both have similar looking heat maps to ESV, branching wide across many factions. These three group also hold the record for most active allies. HOA: 9, ESV: 8, SS: 7.",
  'By contrast CG & CB members have multiple sub-groups within their main factions creating strong internal alliances.',
  'SS appears to be putting in the most ground work involving the newer up and coming factions ie. JustUs, Ballas (This faction is not SSB or ESB).',
  'The CG x HOA alliance has proven to be the most dense region of the chart. This may change as SS is slowly being pulled into the Cerebus x CB x ESV orbit.',
  'The PD & Ballas seem to incur the most conflict and maintain long lasting rivals. The HOA appears to be the only group that is consistently friendly with PD.',
  "Olga, while not being a faction seems significant due to her bench. This is the only bench that isn't backed by a single faction. The middlemen have long revolved around the orbit of Hydra, Angels and HOA. This is why Hydra, Angels and HOA are near one another despite the recent tensions between the three groups.",
  "CG appears to be the only faction that owns/controls two benches although before the SS (Michael Simone's bench) & ESV split, ESV controlled two benches as well. The HOA x Lost bench is the only one that shares blueprints so I placed those benches near one another.",
  "I intentionally left out some up and coming groups like RM & BCF. I don't have enough data on these groups to justify adding them.",
];

const transitionDuration = 150;

function Notes() {
  const [slide, setSlide] = useState(0);
  // const [didUpdate, setDidUpdate] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  // const [{ isPaused, slide }, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setProgress((prevProgress) => (prevProgress + deltaTime * 0.01) % 100);
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
      // dispatch({ type: SET_INVISIBLE });
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

  return (
    <div
      className="flex items-center flex-col justify-center shadow"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="bg-stone-700 text-white w-full">
        <div className="flex justify-between items-center p-2">
          <span>notes</span>
          <span className="text-xs">{`${slide + 1} of ${text.length}`}</span>
        </div>
        <div
          className="h-1 bg-stone-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-xs border-l border-b border-r">
        <TransitionGroup component={null}>
          {text.map((item, i) => (
            <Transition key={i} timeout={transitionDuration}>
              <div
                className={clsx(
                  'p-1.5 transition-all',
                  `duration-${transitionDuration}`,
                  slide === i ? 'opacity-100 relative' : 'opacity-0 absolute'
                )}
              >
                {item}
              </div>
            </Transition>
          ))}
        </TransitionGroup>
      </div>
      <div className="w-full"></div>
    </div>
  );
}

export default Notes;
