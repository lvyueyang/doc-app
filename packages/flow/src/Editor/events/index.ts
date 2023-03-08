import type { Graph } from '@antv/x6';

export * from './port';
export * from './cellEditor';
export * from './edgeTools';
export * from './keyboard';
export * from './contextMenu';

/** 将边置于最底层 */
export function edgeToBack(graph: Graph) {
  graph.on('edge:added', ({ edge }) => {
    edge.toBack();
  });
}
