import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Checkbox({
  name,
  checked,
  onChange,
  children,
  className,
}: InputProps) {
  return (
    <div className={clsx('flex items-center gap-x-2', className)}>
      <label htmlFor={name}>{children}</label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default Checkbox;
