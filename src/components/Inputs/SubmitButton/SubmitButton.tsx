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
      <div className="w-[72px] flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    );
  }

  return (
    <button
      type="submit"
      className={clsx(
        'text-xs hover:cursor-pointer bg-gray-700 hover:bg-gray-900',
        'border transition-colors text-white text-opacity-90 px-4 py-1',
        'disabled:opacity-50 disabled:cursor-default hover:disabled:bg-gray-700'
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
