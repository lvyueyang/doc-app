/** 群组 */
import type { KMSvgNode } from '../../types';
import { createNodeName } from '../utils';

export const GroupNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Group'),
  config: {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
    ],
    attrs: {
      body: {
        fill: 'rgba(251,251,251,0)',
        stroke: 'none',
      },
    },
  },
};
