import clsx from 'clsx';
import { HTMLAttributes, MouseEventHandler, useState } from 'react';

export interface AccordianProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

function Accordian({ label, children }: AccordianProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordian: MouseEventHandler<HTMLSpanElement> = () =>
    setIsOpen((prevState) => !prevState);

  return (
    <div className="flex items-center flex-col justify-center shadow w-full min-w-[360px] bg-white">
      <header
        className="bg-stone-700 text-white text-opacity-90 w-full hover:cursor-pointer hover:bg-stone-900 transition-colors"
        onClick={toggleAccordian}
      >
        <div className="flex justify-between items-center p-2">
          <span>{label}</span>
          <span className={clsx('text-base', isOpen && 'rotate-180')}>
            &#x25BC;
          </span>
        </div>
      </header>
      <div
        className={clsx(
          'text-xs w-full border-l border-r',
          isOpen
            ? 'max-h-[800px] overflow-auto border-b'
            : 'max-h-0 overflow-hidden border-0',
          'transition-all'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordian;
