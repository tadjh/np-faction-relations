import { HTMLAttributes } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SubmitButtonProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}
function SubmitButton({ isLoading = false, children }: SubmitButtonProps) {
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
      className="text-xs hover:cursor-pointer bg-gray-700 hover:bg-gray-900 border transition-colors text-white text-opacity-90 px-4 py-1"
    >
      {children}
    </button>
  );
}

export default SubmitButton;
