import { toast } from 'react-toastify';
import { CloseIcon } from '../../../../../../assets/Icons';
import {
  EVENT_TEXT_EDIT,
  EVENT_TEXT_SIGN_OUT,
} from '../../../../../../config/strings';
import { useAuth } from '../../../../../../hooks';
import { getErrorMessage } from '../../../../../../utils';

export interface AuthStatusProps {
  onClose: () => void;
}

function AuthStatus({ onClose }: AuthStatusProps) {
  let { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(onClose);
    } catch (error: any) {
      toast.error('Error signing out: ' + getErrorMessage(error));
    }
  };

  if (!user) {
    return (
      <div className="text-[8px] flex justify-between items-center">
        <span>{EVENT_TEXT_EDIT}</span>
        <button onClick={onClose} className="text-base">
          <CloseIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="text-[8px] flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <i
          onClick={onClose}
          className="text-base cursor-pointer leading-4 font-sans"
        >
          &#x25C0;
        </i>
        <span>{user.displayName ?? user.uid}</span>
      </div>
      <button onClick={handleSignOut}>{EVENT_TEXT_SIGN_OUT}</button>
    </div>
  );
}

export default AuthStatus;
