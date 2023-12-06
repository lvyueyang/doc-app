import type { Graph } from '@antv/x6';
import { theme } from 'antd';

const TOOLS = [
  // {
  //   name: 'vertices',
  // },
  // {
  //   name: 'segments',
  // },
  {
    name: 'source-arrowhead',
    args: {
      attrs: {
        fill: theme.defaultConfig.token.colorPrimary,
      },
    },
  },
  {
    name: 'target-arrowhead',
    args: {
      attrs: {
        fill: theme.defaultConfig.token.colorPrimary,
      },
    },
  },
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
  // graph.on('edge:mouseenter', ({ edge, view }) => {
  //   // const vertices = view.cell.getVertices();
  //   // console.log('vertices: ', vertices);
  //   edge.addTools([{ name: 'segments' }]);
  // });
  // graph.on('edge:mouseleave', ({ edge }) => {
  //   edge.removeTool('segments');
  // });
}
