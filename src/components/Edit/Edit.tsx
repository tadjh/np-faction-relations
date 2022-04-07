import clsx from 'clsx';
import { useState } from 'react';
import EditLink from '../EditLink';
import EditPanel from '../EditPanel';

function Edit() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <EditLink onClick={handleOpen} />
      <div
        className={clsx(
          'bg-stone-900 z-10 fixed',
          isOpen
            ? 'bg-opacity-75 w-full min-h-screen h-full'
            : 'bg-opacity-0 w-0 h-0',
          'transition-colors duration-1000'
        )}
        onClick={handleClose}
      />
      <EditPanel onClose={handleClose} isOpen={isOpen} />
    </>
  );
}

export default Edit;
