import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return (
      <Link className="text-[8px] hover:underline" to="/admin">
        edit
      </Link>
    );
  }

  return (
    <div className="text-[8px] flex justify-between">
      <span>{auth.user}</span>
      <button
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        sign out
      </button>
    </div>
  );
}

export default AuthStatus;
