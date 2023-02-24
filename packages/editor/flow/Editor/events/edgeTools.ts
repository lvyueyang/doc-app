import type { Graph } from '@antv/x6';

const TOOLS = [
  // {
  //   name: 'vertices',
  // },
  // {
  //   name: 'segments',
  // },
  // {
  //   name: 'source-arrowhead',
  // },
  // {
  //   name: 'target-arrowhead',
  // },
];

/** 鼠标悬浮添加边操作工具 */
export function edgeToolEvents(graph: Graph) {
  graph.on('edge:selected', ({ cell }) => {
    cell.addTools(TOOLS);
  });
  graph.on('edge:unselected', ({ edge }) => {
    TOOLS.forEach(({ name }) => {
      edge.removeTool(name);
    });
  });
}
