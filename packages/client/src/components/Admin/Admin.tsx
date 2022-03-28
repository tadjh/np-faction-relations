import { Outlet } from 'react-router-dom';
import AuthStatus from '../AuthStatus';

function Admin() {
  return (
    <>
      <AuthStatus />
      <Outlet />
    </>
  );
}

export default Admin;
