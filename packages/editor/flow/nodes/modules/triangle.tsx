/**
 * 菱形
 */
import { ObjectExt } from '@antv/x6';
import { DefaultNodeConfig, TRBL_CENTER_GROUPS } from '../constants';
import type { KMSvgNode } from '../types';
import { createTextBlock, createNodeName, lineTypeAttrHooks } from '../utils';
const TextBlock = createTextBlock();

export const TriangleNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Triangle'),
  config: {
    inherit: 'polygon',
    markup: [
      {
        tagName: 'polygon',
        selector: 'body',
      },
      TextBlock.markup,
    ],
    attrs: {
      ...TextBlock.attrs,
      body: {
        fill: DefaultNodeConfig.fill,
        stroke: DefaultNodeConfig.stroke,
        strokeWidth: DefaultNodeConfig.strokeWidth,
      },
    },
    propHooks: (metadata) => {
      ObjectExt.setByPath(metadata, 'attrs/body/refPoints', [
        [0, 0],
        [5, -10],
        [10, 0],
        [5, 10],
      ]);
      return TextBlock.propHooks(metadata);
    },
    attrHooks: {
      ...TextBlock.attrHooks,
      lineType: {
        set: lineTypeAttrHooks,
      },
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
