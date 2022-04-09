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
        'fixed w-[394px] h-screen top-0 left-0 bg-gray-100 border shadow-md flex flex-col gap-y-4 p-4 z-20 overflow-scroll font-mono',
        isOpen ? 'translate-x-0' : 'translate-x-[-500px]',
        'transition-transform'
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
