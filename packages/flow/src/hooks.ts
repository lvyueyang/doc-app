import { useContext } from 'react';
import { FlowEditorContext } from './FlowEditor';

export function useFlowEditor() {
  const { editor } = useContext(FlowEditorContext);
  return {
    editor,
    graph: editor?.graph,
  };
}
