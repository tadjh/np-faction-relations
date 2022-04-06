import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '../../assets/Icons';
import { useAuth } from '../../hooks';

export interface AuthStatusProps {
  onClose: MouseEventHandler<HTMLElement>;
}

function AuthStatus({ onClose }: AuthStatusProps) {
  let { user, signOut, isSignedIn } = useAuth();
  let navigate = useNavigate();

  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    onClose(event);
    navigate('/');
  };

  const handleSignOut = async () => {
    signOut();
    // handleClose();
  };

  const back: MouseEventHandler<HTMLElement> = (event) => onClose(event);

  if (isSignedIn) {
    return (
      <div className="text-[8px] flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <i onClick={back} className="text-base cursor-pointer">
            &#x25C0;
          </i>
          <span>{user?.displayName || user?.uid}</span>
        </div>
        <button onClick={handleSignOut}>sign out</button>
      </div>
    );
  }

  return (
    <div className="text-[8px] flex justify-between items-center">
      <span>edit</span>
      <button onClick={handleClose} className="text-base">
        <CloseIcon />
      </button>
    </div>
  );
}

export default AuthStatus;
