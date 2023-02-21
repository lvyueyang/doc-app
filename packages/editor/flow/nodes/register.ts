import { Graph } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import * as nodes from './index';
import type { KMNode } from './types';

Object.values(nodes).forEach((node: KMNode) => {
  if (node.type === 'svg') {
    Graph.registerNode(node.NODE_NAME, node.config);
  } else {
    const { NODE_NAME, Component, ports, ...config } = node;
    register({
      shape: NODE_NAME,
      component: Component,
      ports,
      ...config,
    });
  }
});
