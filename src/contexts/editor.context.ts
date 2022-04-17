import { createContext } from 'react';

export interface EditorContextType {
  isEditorOpen: boolean;
  openEditor: VoidFunction;
  closeEditor: VoidFunction;
}

let EditorContext = createContext<EditorContextType>(null!);

export default EditorContext;
