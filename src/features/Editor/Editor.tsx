import clsx from 'clsx';
import EditorLink from './components/EditorLink';
import EditorPanel from './components/EditorPanel';
import { useEditor } from './hooks';

function Editor() {
  const { isOpen, openEditor, closeEditor } = useEditor();

  return (
    <>
      <EditorLink onClick={openEditor} />
      <div
        className={clsx(
          'bg-gray-900 z-10 fixed',
          isOpen
            ? 'bg-opacity-75 w-full min-h-screen h-full'
            : 'bg-opacity-0 w-0 h-0',
          'transition-colors duration-1000'
        )}
        onClick={closeEditor}
      />
      <EditorPanel onClose={closeEditor} isOpen={isOpen} />
    </>
  );
}

export default Editor;
