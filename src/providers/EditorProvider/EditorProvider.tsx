import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorContext from '../../contexts/editor.context';

function EditorProvider({ children }: { children: ReactNode }) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  let navigate = useNavigate();

  const openEditor = () => setIsEditorOpen(true);

  const closeEditor = () => {
    setIsEditorOpen(false);
    navigate('/');
  };
  const value = { isEditorOpen, openEditor, closeEditor };
  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export default EditorProvider;
