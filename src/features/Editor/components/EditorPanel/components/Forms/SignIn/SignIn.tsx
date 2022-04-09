import { FormEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ERROR_TEXT_EDIT_PERMISSION_DENIED,
  EVENT_TEXT_SIGN_IN,
} from '../../../../../../../config/strings';
import { useAuth } from '../../../../../../../hooks';
import SubmitButton from '../../../../../../../components/Inputs/SubmitButton';
import { toast } from 'react-toastify';
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
    <div className="flex items-center flex-col justify-center shadow w-full bg-white">
      <div className="bg-stone-700 text-white text-opacity-90 w-full">
        <div className="flex justify-between items-center p-2 group">
          <span>{EVENT_TEXT_SIGN_IN}</span>
        </div>
      </div>
      <form
        className="text-xs border-l border-b border-r w-full gap-y-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="px-2 pt-2">{ERROR_TEXT_EDIT_PERMISSION_DENIED}</div>
        <div className="w-full flex justify-end items-center p-2 h-11">
          <SubmitButton isLoading={isFetching}>
            {EVENT_TEXT_SIGN_IN}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
