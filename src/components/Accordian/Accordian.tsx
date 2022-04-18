import clsx from 'clsx';
import { HTMLAttributes, MouseEventHandler, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export interface AccordianProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  show?: boolean;
}

function Accordian({ label, children, show }: AccordianProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (show !== true) return;
    setIsOpen(true);
  }, [show]);

  const toggleAccordian: MouseEventHandler<HTMLSpanElement> = () =>
    setIsOpen((prevState) => !prevState);

  return (
    <div className="flex w-full min-w-[360px] flex-col items-center justify-center bg-white shadow">
      <header
        className="w-full bg-gray-700 text-white text-opacity-90 transition-colors hover:cursor-pointer hover:bg-gray-900"
        onClick={toggleAccordian}
      >
        <div className="flex items-center justify-between px-2 py-1.5">
          <span>{label}</span>
          <FontAwesomeIcon
            icon={faCaretDown}
            className={clsx(isOpen && 'rotate-180')}
          />
        </div>
      </header>
      <div
        className={clsx(
          'w-full border-l border-r text-xs transition-all',
          isOpen
            ? 'max-h-[800px] overflow-auto border-b'
            : 'max-h-0 overflow-hidden border-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordian;
