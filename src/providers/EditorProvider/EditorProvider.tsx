import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorContext from '../../contexts/editor.context';

function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  const openEditor = () => setIsOpen(true);

  const closeEditor = () => {
    setIsOpen(false);
    navigate('/');
  };
  const value = { isOpen, openEditor, closeEditor };
  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export default AuthProvider;
