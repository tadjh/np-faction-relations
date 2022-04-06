import { MouseEventHandler } from 'react';
import { Outlet } from 'react-router-dom';
import AuthStatus from '../AuthStatus';

export interface AdminProps {
  onClose: MouseEventHandler<HTMLElement>;
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
