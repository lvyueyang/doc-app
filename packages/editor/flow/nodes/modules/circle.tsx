import { TRBL_CENTER_GROUPS } from '../constants';
import type { KMSvgNode } from '../types';
import { createTextBlock, createNodeName } from '../utils';

const TextBlock = createTextBlock();

export const CircleNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Circle'),
  config: {
    inherit: 'circle',
    markup: [
      {
        tagName: 'circle',
        selector: 'body',
      },
      TextBlock.markup,
    ],
    attrs: {
      ...TextBlock.attrs,
    },
    propHooks: TextBlock.propHooks,
    attrHooks: {
      ...TextBlock.attrHooks,
    },
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
