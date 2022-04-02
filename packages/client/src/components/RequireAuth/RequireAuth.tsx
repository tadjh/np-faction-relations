import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isSignedIn } = useAuth();
  let location = useLocation();

  if (isSignedIn()) return children;

  return (
    <Navigate
      to="/np-faction-relations/login"
      state={{ from: location }}
      replace
    />
  );
}

export default RequireAuth;
