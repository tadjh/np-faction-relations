import clsx from 'clsx';
import { Routes, Route } from 'react-router-dom';
import EditLayout from './components/EditorLayout';
import Widgets from './components/Widgets';
import RequireAuth from './components/RequireAuth';
import SignIn from './components/Forms/SignIn';

export interface EditPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditPanel({ isOpen, onClose }: EditPanelProps) {
  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-100 flex h-screen w-[394px] flex-col gap-y-4 overflow-scroll border bg-gray-100 p-4 font-mono shadow-md transition-transform',
        isOpen ? 'translate-x-0' : 'translate-x-[-500px]'
      )}
    >
      <Routes>
        <Route path="/" element={<EditLayout onClose={onClose} />}>
          <Route path="signin" element={<SignIn />} />
          <Route
            path="edit"
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
