import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

function RequireAuth({ children }: { children: JSX.Element }) {
  let { user } = useAuth();
  let location = useLocation();

  if (!!user) return children;

  return <Navigate to="/signin" state={{ from: location }} replace />;
}

export default RequireAuth;
