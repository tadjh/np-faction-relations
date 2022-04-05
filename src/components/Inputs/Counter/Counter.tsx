import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export interface CounterProps extends InputHTMLAttributes<HTMLInputElement> {
  isVisible?: boolean;
  isWrapped?: boolean;
}

const UnwrappedCounter = ({
  name,
  isVisible = true,
  value,
  onChange,
  children,
  min,
}: CounterProps) => (
  <>
    <label
      htmlFor={`${name}Count`}
      className={clsx(
        !isVisible ? 'opacity-0' : 'opacity-100',
        'transition-opacity'
      )}
    >
      {children}
    </label>
    <input
      type="number"
      name={`${name}Count`}
      className={clsx(
        !isVisible ? 'opacity-0' : 'opacity-100',
        'border w-10 text-right',
        'transition-opacity'
      )}
      value={value}
      onChange={onChange}
      min={min}
    />
  </>
);

function Counter({ isWrapped = true, ...props }: CounterProps) {
  return isWrapped ? (
    <div className="flex gap-x-2 items-center px-2">
      <UnwrappedCounter {...props} />
    </div>
  ) : (
    <>
      <UnwrappedCounter {...props} />
    </>
  );
}

export default Counter;
