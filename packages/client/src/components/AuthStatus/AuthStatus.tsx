import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

export interface AuthStatusProps {
  onClose: () => void;
}

function AuthStatus({ onClose }: AuthStatusProps) {
  let auth = useAuth();
  let navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(-1);
  };

  const handleSignOut = () => {
    onClose();
    auth.signout(() => navigate(-1));
  };

  if (!auth.user) {
    return (
      <div className="text-[8px] flex justify-between items-center">
        <Link
          className="text-[8px] hover:underline"
          to="/np-faction-relations/admin"
        >
          admin
        </Link>
        <button onClick={handleClose} className="text-base">
          &#x2716;
        </button>
      </div>
    );
  }

  return (
    <div className="text-[8px] flex justify-between items-center">
      <span>{auth.user}</span>
      <button onClick={handleSignOut}>logout</button>
    </div>
  );
}

export default AuthStatus;
