import { Outlet } from 'react-router-dom';
import AuthStatus from '../../../AuthStatus';

export interface LayoutProps {
  onClose: () => void;
}

function EditLayout({ onClose }: LayoutProps) {
  return (
    <>
      <AuthStatus onClose={onClose} />
      <Outlet />
    </>
  );
}

export default EditLayout;
