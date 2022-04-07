import { useNavigate } from 'react-router-dom';
import CloseIcon from '../../assets/Icons';
import { EVENT_TEXT_EDIT, EVENT_TEXT_SIGN_OUT } from '../../config/strings';
import { useAuth } from '../../hooks';

export interface AuthStatusProps {
  onClose: () => void;
}

function AuthStatus({ onClose }: AuthStatusProps) {
  let { user, signOut } = useAuth();
  let navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  if (!!user) {
    return (
      <div className="text-[8px] flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <i onClick={handleClose} className="text-base cursor-pointer">
            &#x25C0;
          </i>
          <span>{user?.displayName || user?.uid}</span>
        </div>
        <button onClick={handleSignOut}>{EVENT_TEXT_SIGN_OUT}</button>
      </div>
    );
  }

  return (
    <div className="text-[8px] flex justify-between items-center">
      <span>{EVENT_TEXT_EDIT}</span>
      <button onClick={handleClose} className="text-base">
        <CloseIcon />
      </button>
    </div>
  );
}

export default AuthStatus;
