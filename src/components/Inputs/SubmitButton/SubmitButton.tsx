import { ButtonHTMLAttributes } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export interface SubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
function SubmitButton({
  isLoading = false,
  children,
  disabled,
}: SubmitButtonProps) {
  if (isLoading) {
    return (
      <div className="flex w-[72px] items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    );
  }

  return (
    <button
      type="submit"
      className={clsx(
        'border bg-gray-700 px-4 py-1 text-xs text-white text-opacity-90 transition-colors hover:cursor-pointer hover:bg-gray-900 disabled:cursor-default disabled:opacity-50 hover:disabled:bg-gray-700'
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
