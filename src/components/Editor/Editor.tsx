import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorLink from './components/EditorLink';
import EditorPanel from './components/EditorPanel';

function Editor() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <EditorLink onClick={handleOpen} />
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
      <EditorPanel onClose={handleClose} isOpen={isOpen} />
    </>
  );
}

export default Editor;
