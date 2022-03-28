import { Outlet } from 'react-router-dom';
import AuthStatus from '../AuthStatus';

export interface AdminProps {
  onClose: () => void;
}

function Admin({ onClose }: AdminProps) {
  return (
    <>
      <AuthStatus onClose={onClose} />
      <Outlet />
    </>
  );
}

export default Admin;
