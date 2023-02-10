import { Graph, Shape } from '@antv/x6';
import { NODE_NAME } from './';

Object.values(NODE_NAME).forEach((node) => {
  Graph.registerNode(node.name, node.config);
});
