import type { KMSvgEdge } from '../types';
import { createEdgeName } from '../utils';

export const MindmapEdgeConfig: KMSvgEdge = {
  EDGE_NAME: createEdgeName('Mindmap'),
  config: {
    inherit: 'edge',
    connector: {
      name: 'mindmap',
    },
    attrs: {
      line: {
        targetMarker: '',
        stroke: '#A2B1C3',
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
  force: true,
};
