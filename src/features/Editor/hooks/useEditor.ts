import { useContext } from 'react';
import EditorContext from '../../../contexts/editor.context';

export function useEditor() {
  return useContext(EditorContext);
}
