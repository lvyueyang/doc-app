/**
 * 椭圆
 */
import { DefaultNodeConfig, TRBL_CENTER_GROUPS } from '../constants';
import type { KMSvgNode } from '../types';
import { createTextBlock, createNodeName, lineTypeAttrHooks } from '../utils';
const TextBlock = createTextBlock();

export const EllipseNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Ellipse'),
  config: {
    inherit: 'ellipse',
    markup: [
      {
        tagName: 'ellipse',
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
    propHooks: TextBlock.propHooks,
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
