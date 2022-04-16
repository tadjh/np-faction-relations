import { FormEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ERROR_TEXT_EDITOR_PERMISSION_DENIED,
  EVENT_TEXT_SIGN_IN,
} from '../../../config/strings';
import { useAuth } from '../../../../../../../hooks';
import SubmitButton from '../../../../../../../components/Inputs/SubmitButton';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../../../../../utils';

function SignIn() {
  let navigate = useNavigate();
  let location = useLocation();
  let { signIn } = useAuth();

  const [isFetching, setIsFetching] = useState(false);

  const state = location.state as any;

  let from: string = state?.from?.pathname || '/';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      await signIn();
      setIsFetching(false);
      navigate(from, { replace: true });
    } catch (error: any) {
      setIsFetching(false);
      toast.error('Error signing in: ' + getErrorMessage(error));
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-white shadow">
      <div className="w-full bg-gray-700 text-white text-opacity-90">
        <div className="group flex items-center justify-between p-2">
          <span>{EVENT_TEXT_SIGN_IN}</span>
        </div>
      </div>
      <form
        className="flex w-full flex-col gap-y-2 border-l border-b border-r text-xs"
        onSubmit={handleSubmit}
      >
        <div className="px-2 pt-2">{ERROR_TEXT_EDITOR_PERMISSION_DENIED}</div>
        <div className="flex h-11 w-full items-center justify-end p-2">
          <SubmitButton isLoading={isFetching}>
            {EVENT_TEXT_SIGN_IN}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
