import { toast } from 'react-toastify';
import { BackIcon, CloseIcon } from '../../../../../../assets/Icons';
import { EVENT_TEXT_EDIT, EVENT_TEXT_SIGN_OUT } from '../../config/strings';
import { useAuth } from '../../../../../../hooks';
import { getErrorMessage } from '../../../../../../utils';
import IconButton from '../../../../../../components/Inputs/IconButton';

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
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="text-[8px] flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <IconButton onClick={onClose}>
          <BackIcon />
        </IconButton>
        <span>{user.displayName ?? user.uid}</span>
      </div>
      <button onClick={handleSignOut}>{EVENT_TEXT_SIGN_OUT}</button>
    </div>
  );
}

export default AuthStatus;
