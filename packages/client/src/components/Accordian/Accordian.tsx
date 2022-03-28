import clsx from 'clsx';
import { HTMLAttributes, MouseEventHandler, useState } from 'react';

export interface AccordianProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

function Accordian({ label, children }: AccordianProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddAccordian: MouseEventHandler<HTMLSpanElement> = (event) => {
    if (!isOpen) {
      setIsOpen((prevState) => !prevState);

      const timeout = setTimeout(() => {
        setIsAnimating(true);
        clearTimeout(timeout);
      }, 0);
    } else {
      setIsAnimating(false);

      const timeout = setTimeout(() => {
        setIsOpen((prevState) => !prevState);
        clearTimeout(timeout);
      }, 150);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center shadow w-full min-w-[360px]">
      <header
        className="bg-stone-700 text-white text-opacity-90 w-full hover:cursor-pointer hover:bg-stone-900 transition-colors"
        onClick={handleAddAccordian}
      >
        <div className="flex justify-between items-center p-2">
          <span>{label}</span>
          <span className={clsx('text-base', isOpen && 'rotate-180')}>
            &#x25BC;
          </span>
        </div>
      </header>
      {isOpen && (
        <div
          className={clsx(
            'text-xs border-l border-b border-r w-full',
            isAnimating
              ? 'max-h-[700px] overflow-auto'
              : 'max-h-0 overflow-hidden',
            'transition-all'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordian;
