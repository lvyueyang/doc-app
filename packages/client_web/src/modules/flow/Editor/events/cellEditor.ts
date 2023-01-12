import type { Graph } from '@antv/x6';

/** 双击添加文本 */
export function cellEditorEvents(graph: Graph) {
  graph.on('cell:dblclick', ({ cell, e }) => {
    const isNode = cell.isNode();
    const name = isNode ? 'node-editor' : 'edge-editor';
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
}
