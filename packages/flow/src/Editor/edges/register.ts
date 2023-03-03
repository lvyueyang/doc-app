import { Graph, Shape } from '@antv/x6';
import * as edges from './index';

Shape.Edge.config({
  router: {
    name: 'manhattan',
    args: {
      // offset: 'center',
      // step: 10,
      padding: 10,
    },
  },
});

Object.values(edges).forEach((edge) => {
  Graph.registerEdge(edge.EDGE_NAME, edge.config);
});
