/**
 * 卡片
 */
import { ObjectExt } from '@antv/x6';
import { TRBL_CENTER_GROUPS } from '../../constants';
import type { KMSvgNode } from '../../types';
import { createNodeName, createTextSvgNodeConfig } from '../utils';

export const CardNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Card'),
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
          [0, 2],
          [2, 0],
          [10, 0],
          [10, 5],
          [0, 5],
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
