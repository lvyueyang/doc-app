/**
 * 菱形
 */
import { ObjectExt } from '@antv/x6';
import { TRBL_CENTER_GROUPS } from '../constants';
import type { KMSvgNode } from '../types';
import { createNodeName, createTextSvgNodeConfig } from '../utils';

export const TriangleNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Triangle'),
  config: {
    inherit: 'polygon',
    ...createTextSvgNodeConfig({
      markup: [
        {
          tagName: 'polygon',
          selector: 'body',
        },
      ],
      propHooks: (metadata) => {
        ObjectExt.setByPath(metadata, 'attrs/body/refPoints', [
          [0, 0],
          [5, -10],
          [10, 0],
          [5, 10],
        ]);
        return metadata;
      },
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
