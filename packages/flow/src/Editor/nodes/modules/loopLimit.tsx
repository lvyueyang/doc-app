/**
 * 卡片
 */
import { ObjectExt } from '@antv/x6';
import { TRBL_CENTER_GROUPS } from '../../constants';
import type { KMSvgNode } from '../../types';
import { createNodeName, createTextSvgNodeConfig } from '../utils';

export const LoopLimitNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('LoopLimit'),
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
          [0, 1.5],
          [2, 0],
          [8, 0],
          [10, 1.5],
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
