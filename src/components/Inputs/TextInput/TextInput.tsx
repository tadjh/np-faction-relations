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
  ...props
}: InputProps) {
  return (
    <div className={clsx('flex items-center gap-x-2', className)}>
      <label htmlFor={name} className="flex w-1/3 gap-x-0.5">
        {children}
      </label>
      <input
        type={type}
        name={name}
        className="flex-1 border"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Input;
