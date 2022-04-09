import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FIFTEEN_SECONDS_IN_MILLISECONDS,
  SCALAR,
  TRANSITION_DURATION_IN_MILLISECONDS,
} from '../config';

function useNotes(lastPage: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const isPaused = useRef(true);
  const requestRef = useRef<number | null>(null);
  const timeRef = useRef<number | null>(null);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const pause = () => (isPaused.current = true);

  const unpause = () => (isPaused.current = false);

  const increment = useCallback(() => {
    slide === lastPage - 1
      ? setSlide(0)
      : setSlide((prevSlide) => prevSlide + 1);
  }, [lastPage, slide]);

  const decrement = () => {
    slide === 0
      ? setSlide(lastPage - 1)
      : setSlide((prevSlide) => prevSlide - 1);
  };

  const reset = () => {
    saveTime(null);
    setProgress(0);
    unpause();
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

  const saveTime = (time: number | null) => {
    timeRef.current = time;
  };

  const cancel = (handle: number | null) => {
    if (handle === null) return;
    cancelAnimationFrame(handle);
  };

  const animate = useCallback((time: number) => {
    if (timeRef.current) {
      const deltaTime = time - timeRef.current;
      setProgress(
        (prevProgress) => (prevProgress + deltaTime * 0.01 * SCALAR) % 100
      );
    }
    saveTime(time);
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  const handleOnMouseEnter = () => {
    pause();
    cancel(requestRef.current);
  };

  const handleOnMouseLeave = () => reset();

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      if (isPaused.current) return clearInterval(interval);
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
    if (!isOpen) return;
    requestRef.current = requestAnimationFrame(animate);
    return () => cancel(requestRef.current);
  }, [isOpen, animate]);

  useEffect(() => {
    if (Math.round(progress) === 100)
      return () => {
        timeRef.current = null;
        cancel(requestRef.current);
      };
  }, [progress]);

  return {
    isOpen,
    slide,
    progress,
    handleOpen,
    handleClose,
    handleOnMouseEnter,
    handleOnMouseLeave,
    next,
    previous,
  };
}

export default useNotes;
