import { Outlet } from 'react-router-dom';
import AuthStatus from '../AuthStatus';

export interface LayoutProps {
  onClose: () => void;
}

function Layout({ onClose }: LayoutProps) {
  return (
    <>
      <AuthStatus onClose={onClose} />
      <Outlet />
    </>
  );
}

export default Layout;
