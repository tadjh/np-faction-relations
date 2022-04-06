import clsx from 'clsx';
import { MouseEvent, useCallback, useState } from 'react';
import AuthProvider from '../../providers/AuthProvider';
import EditLink from '../EditLink';
import EditPanel from '../EditPanel';

function Edit() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  const handleClose = useCallback(
    (event: MouseEvent<HTMLElement>, force?: boolean) => {
      if (force) return setIsOpen(false);
      if (event.target !== event.currentTarget) return;
      setIsOpen(false);
    },
    []
  );

  return (
    <AuthProvider>
      <EditLink onClick={handleOpen} />
      <div
        className={clsx(
          'bg-stone-900 z-10 absolute',
          isOpen ? 'bg-opacity-75 w-full min-h-screen' : 'bg-opacity-0 w-0 h-0',
          'transition-colors duration-1000'
        )}
        onClick={handleClose}
      >
        <EditPanel onClose={(e) => handleClose(e, true)} isOpen={isOpen} />
      </div>
    </AuthProvider>
  );
}

export default Edit;
