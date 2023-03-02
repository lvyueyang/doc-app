/**
 * 曲线箭头
 */
import type { KMSvgEdge } from '../types';
import { createEdgeName } from '../utils';

export const CurveEdgeConfig: KMSvgEdge = {
  EDGE_NAME: createEdgeName('Curve'),
  config: {
    connector: { name: 'smooth' },
    inherit: 'edge',
    tools: [
      // {
      //   name: 'vertices',
      // },
      // {
      //   name: 'segments',
      // },
    ],
  },
};
