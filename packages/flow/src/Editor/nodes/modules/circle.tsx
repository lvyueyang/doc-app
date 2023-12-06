/**
 * 圆形
 */
import { TRBL_CENTER_GROUPS } from '../../constants';
import type { KMSvgNode } from '../../types';
import { createNodeName, createTextSvgNodeConfig } from '../utils';

export const CircleNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Circle'),
  config: {
    inherit: 'circle',
    ...createTextSvgNodeConfig({
      markup: [
        {
          tagName: 'circle',
          selector: 'body',
        },
      ],
    }),
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
