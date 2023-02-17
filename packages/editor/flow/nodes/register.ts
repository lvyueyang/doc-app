import { Graph } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import * as nodes from './index';
import type { KMNode } from './types';

Object.values(nodes).forEach((node: KMNode) => {
  if (node.type === 'svg') {
    Graph.registerNode(node.NODE_NAME, node.config);
  } else {
    register({
      shape: node.NODE_NAME,
      component: node.Component,
      ports: node.ports,
    });
  }
});
