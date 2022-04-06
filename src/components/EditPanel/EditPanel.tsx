import clsx from 'clsx';
import { Routes, Route } from 'react-router-dom';
import Admin from '../Admin';
import Widgets from '../Widgets';
import RequireAuth from '../RequireAuth';
import SignIn from '../SignIn';
import { MouseEventHandler } from 'react';
import { PATH_EDIT, PATH_SIGN_IN } from '../../config/strings';

export interface EditPanelProps {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

function EditPanel({ isOpen, onClose }: EditPanelProps) {
  return (
    <div
      className={clsx(
        'absolute w-[394px] h-screen top-0 left-0 bg-stone-100 border shadow-md flex flex-col gap-y-4 p-4 z-20',
        isOpen ? 'translate-x-0' : 'translate-x-[-500px]',
        'transition-transform'
      )}
    >
      <Routes>
        <Route path="/" element={<Admin onClose={onClose} />}>
          <Route path={PATH_SIGN_IN} element={<SignIn />} />
          <Route
            path={PATH_EDIT}
            element={
              <RequireAuth>
                <Widgets />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default EditPanel;
