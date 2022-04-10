import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

function IconButton({
  onClick: handleOnClick,
  type = 'button',
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={clsx(
        'text-base p-1 hover:bg-gray-200 bg-opacity-5 hover:shadow-sm transition-colors'
      )}
    >
      {children}
    </button>
  );
}

export default IconButton;
