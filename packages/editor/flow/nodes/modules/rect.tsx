import type { KMReactNode, KMSvgNode, ReactNodeProps } from '../types';
import { DefaultNodeConfig, TextBlockMarkup, TRBL_CENTER_GROUPS } from '../constants';
import { createNodeName } from '../utils';
import { ObjectExt } from '@antv/x6';

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
