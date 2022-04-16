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
          'fixed z-20 bg-gray-900 transition-colors duration-1000',
          isOpen
            ? 'h-full min-h-screen w-full bg-opacity-75'
            : 'h-0 w-0 bg-opacity-0'
        )}
        onClick={closeEditor}
      />
      <EditorPanel onClose={closeEditor} isOpen={isOpen} />
    </>
  );
}

export default Editor;
