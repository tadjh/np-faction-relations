import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

export interface AuthStatusProps {
  onClose: () => void;
}

function AuthStatus({ onClose }: AuthStatusProps) {
  let { user, signOut, isSignedIn } = useAuth();
  let navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  const handleSignOut = async () => {
    signOut();
    handleClose();
  };

  const back = () => onClose();

  if (isSignedIn) {
    return (
      <div className="text-[8px] flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <i onClick={back} className="text-base cursor-pointer">
            &#x25C0;
          </i>
          <span>{user}</span>
        </div>
        <button onClick={handleSignOut}>sign out</button>
      </div>
    );
  }

  return (
    <div className="text-[8px] flex justify-between items-center">
      <Link className="text-[8px] hover:underline" to="/admin">
        edit
      </Link>
      <button onClick={handleClose} className="text-base">
        &#x2716;
      </button>
    </div>
  );
}

export default AuthStatus;
