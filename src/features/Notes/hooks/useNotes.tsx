import { useContext } from 'react';
import NotesContext from '../../../contexts/notes.context';

export function useNotes() {
  return useContext(NotesContext);
}
