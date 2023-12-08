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
  // 将边置于最底层, 否则会出现覆盖到链接桩问题
  zIndex: 0,
  attrHooks: {
    text: {
      set(text: string, { elem, ...e }) {
        elem.innerHTML = text;
      },
      position(text, { refBBox, elem }) {
        if (elem instanceof SVGElement) {
          return refBBox.getCenter();
        }
      },
    },
  },
});

Object.values(edges).forEach((edge) => {
  Graph.registerEdge(edge.EDGE_NAME, edge.config);
});
