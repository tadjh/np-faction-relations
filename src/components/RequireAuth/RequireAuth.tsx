import { Navigate, useLocation } from 'react-router-dom';
import { PATH_SIGN_IN } from '../../config/strings';
import { useAuth } from '../../hooks';

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isSignedIn } = useAuth();
  let location = useLocation();

  if (isSignedIn) return children;

  return (
    <Navigate to={`/${PATH_SIGN_IN}`} state={{ from: location }} replace />
  );
}

export default RequireAuth;
