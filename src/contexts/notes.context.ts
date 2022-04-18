import { createContext } from 'react';

export interface NotesContextType {
  isNotesOpen: boolean;
  openNotes: VoidFunction;
  closeNotes: VoidFunction;
}

let NotesContext = createContext<NotesContextType>(null!);

export default NotesContext;
