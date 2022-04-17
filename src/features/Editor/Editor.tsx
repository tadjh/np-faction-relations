import clsx from 'clsx';
import EditorPanel from './components/EditorPanel';
import { useEditor } from './hooks';

function Editor() {
  const { isEditorOpen: isOpen, closeEditor: handleClose } = useEditor();

  return (
    <>
      <div
        className={clsx(
          'fixed z-90 bg-gray-900 transition-colors duration-1000',
          isOpen
            ? 'h-full min-h-screen w-full bg-opacity-75'
            : 'h-0 w-0 bg-opacity-0'
        )}
        onClick={handleClose}
      />
      <EditorPanel onClose={handleClose} isOpen={isOpen} />
    </>
  );
}

export default Editor;
