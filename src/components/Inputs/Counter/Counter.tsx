import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export interface CounterProps extends InputHTMLAttributes<HTMLInputElement> {
  isWrapped?: boolean;
}

const UnwrappedCounter = ({
  name,
  value,
  onChange,
  children,
  min,
  hidden,
}: CounterProps) => (
  <>
    <label
      htmlFor={`${name}Count`}
      className={clsx(
        'transition-opacity',
        hidden ? 'opacity-0' : 'opacity-100'
      )}
    >
      {children}
    </label>
    <input
      type="number"
      name={`${name}Count`}
      className={clsx(
        hidden ? 'opacity-0' : 'opacity-100',
        'w-10 border text-right transition-opacity'
      )}
      value={value}
      onChange={onChange}
      min={min}
    />
  </>
);

function Counter({ isWrapped = true, ...props }: CounterProps) {
  return isWrapped ? (
    <div className="flex items-center gap-x-2 px-2">
      <UnwrappedCounter {...props} />
    </div>
  ) : (
    <>
      <UnwrappedCounter {...props} />
    </>
  );
}

export default Counter;
