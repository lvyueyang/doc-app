import { Graph } from '@antv/x6';
import * as edges from './index';

Object.values(edges).forEach((edge) => {
  Graph.registerEdge(edge.EDGE_NAME, edge.config);
});
