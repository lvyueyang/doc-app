import type { Graph } from '@antv/x6';
import { TextEditorClassName } from '../nodes/constants';

/** 双击添加文本 */
export function cellEditorEvents(graph: Graph) {
  graph.on('edge:dblclick', ({ cell, e }) => {
    const name = 'edge-text-editor';
    cell.removeTool(name);
    cell.addTools({
      name,
      args: {
        event: e,
        attrs: {
          backgroundColor: '#FFF',
        },
      },
    });
  });
  graph.on('node:dblclick', ({ cell, node, view, e }) => {
    const name = 'node-text-editor';
    cell.removeTool(name);

    const editorContainer = view.container.querySelector(`.${TextEditorClassName}`);
    if (!editorContainer) return;
    const style = (node.getAttrs().label?.style as React.CSSProperties) || {};

    cell.addTools({
      name,
      args: {
        event: e,
        attrs: {
          ...style,
        },
      },
    });
  });
}
