import type { KMSvgEdge } from '../types';
import { createEdgeName } from '../utils';

export const MindMapEdgeConfig: KMSvgEdge = {
  EDGE_NAME: createEdgeName('MindMap'),
  config: {
    inherit: 'edge',
    attrs: {
      line: {
        targetMarker: '',
        stroke: '#000',
        strokeWidth: 1,
      },
    },
    zIndex: 0,
  },
  force: true,
};
