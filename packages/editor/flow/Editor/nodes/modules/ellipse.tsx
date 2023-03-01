/**
 * 椭圆
 */
import { TRBL_CENTER_GROUPS } from '../constants';
import type { KMSvgNode } from '../types';
import { createNodeName, createTextSvgNodeConfig } from '../utils';

export const EllipseNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Ellipse'),
  config: {
    inherit: 'ellipse',
    ...createTextSvgNodeConfig({
      markup: [
        {
          tagName: 'ellipse',
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
