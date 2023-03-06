/**
 * 跨页引用
 */
import { ObjectExt } from '@antv/x6';
import { TRBL_CENTER_GROUPS } from '../../constants';
import type { KMSvgNode } from '../../types';
import { createNodeName, createTextSvgNodeConfig } from '../utils';

export const OffPageReferenceNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('OffPageReference'),
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
          [10, 0],
          [10, 6.5],
          [5, 10],
          [0, 6.5],
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
