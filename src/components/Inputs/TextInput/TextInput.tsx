import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({
  name,
  value,
  type,
  onChange,
  className,
  children,
}: InputProps) {
  return (
    <div className={clsx('flex gap-x-2 items-center px-2', className)}>
      <label htmlFor={name} className="w-32">
        {children}
      </label>
      <input
        type={type}
        name={name}
        className="border flex-1"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
