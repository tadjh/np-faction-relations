import { HTMLAttributes } from 'react';

export interface SubmitButtonProps extends HTMLAttributes<HTMLDivElement> {
  isFetching?: boolean;
}
function SubmitButton({ isFetching = false, children }: SubmitButtonProps) {
  return (
    <div className="w-full flex justify-end p-2 h-11">
      {!isFetching ? (
        <button
          type="submit"
          className="text-xs hover:cursor-pointer bg-stone-700 hover:bg-stone-900 border transition-colors text-white text-opacity-90 px-4 py-1"
        >
          {children}
        </button>
      ) : (
        <div className="w-[72px] flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-5 text-stone-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default SubmitButton;