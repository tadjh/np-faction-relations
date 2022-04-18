import toast from 'react-hot-toast';
import { EVENT_TEXT_EDIT, EVENT_TEXT_SIGN_OUT } from '../../config/strings';
import { useAuth } from '../../../../../../hooks';
import { getErrorMessage } from '../../../../../../utils';
import IconButton from '../../../../../../components/Inputs/IconButton';
import { faXmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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
      <div className="flex items-center justify-between text-[8px]">
        <span>{EVENT_TEXT_EDIT}</span>
        <IconButton onClick={onClose} icon={faXmark} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between text-[8px]">
      <div className="flex items-center gap-x-2">
        <IconButton onClick={onClose} icon={faChevronLeft} />
        <span>{user.displayName ?? user.uid}</span>
      </div>
      <button onClick={handleSignOut} type="button" className="hover:underline">
        {EVENT_TEXT_SIGN_OUT}
      </button>
    </div>
  );
}

export default AuthStatus;
