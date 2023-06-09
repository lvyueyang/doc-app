/**
 * 文档
 */
import { ObjectExt } from '@antv/x6';
import { TRBL_CENTER_GROUPS } from '../../constants';
import type { KMSvgNode } from '../../types';
import { createNodeName, createTextSvgNodeConfig } from '../utils';

export const DocNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Doc'),
  config: {
    inherit: 'path',
    ...createTextSvgNodeConfig({
      markup: [
        {
          tagName: 'path',
          selector: 'body',
        },
      ],
      propHooks: (metadata) => {
        ObjectExt.setByPath(
          metadata,
          'attrs/body/refD',
          'M 2805 2014 C 2807.76 2014 2810 2016.24 2810 2019 L 2810 2066.5 Q 2785 2053 2760 2066.5 Q 2735 2080 2710 2066.5 L 2710 2021.5 L 2710 2019 C 2710 2016.24 2712.24 2014 2715 2014 Z',
        );
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
          group: 'left',
        },
      ],
    },
  },
};
