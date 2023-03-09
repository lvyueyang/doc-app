import { useContext } from 'react';
import { MindEditorContext } from './MindEditor';

export function useMindEditor() {
  const { editor } = useContext(MindEditorContext);
  return {
    editor,
    graph: editor?.graph,
  };
}
