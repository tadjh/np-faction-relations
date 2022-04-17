import { useState, ReactNode } from 'react';
import NotesContext from '../../contexts/notes.context';

function NotesProvider({ children }: { children: ReactNode }) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const openNotes = () => setIsNotesOpen(true);

  const closeNotes = () => setIsNotesOpen(false);

  const value = { isNotesOpen, openNotes, closeNotes };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesProvider;
