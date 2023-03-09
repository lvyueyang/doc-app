/** 矩形 */
import { TRBL_CENTER_GROUPS } from '../../constants';
import type { KMSvgNode } from '../../types';
import { createNodeName } from '../utils';

export const RectNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Rect'),
  config: {
    inherit: 'text-block',
    ports: {
      groups: {
        ...TRBL_CENTER_GROUPS,
      },
      items: [
        {
          group: 'top',
        },
        {
          group: 'right',
        },
        {
          group: 'bottom',
        },
        {
          group: 'left',
        },
      ],
    },
  },
};
