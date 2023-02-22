/**
 * 圆柱
 */
import { ObjectExt } from '@antv/x6';
import { DefaultNodeConfig, TRBL_CENTER_GROUPS } from '../constants';
import type { KMSvgNode } from '../types';
import { createTextBlock, createNodeName, lineTypeAttrHooks } from '../utils';
const TextBlock = createTextBlock();

export const CylinderNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Cylinder'),
  config: {
    inherit: 'path',
    markup: [
      {
        tagName: 'path',
        selector: 'body',
      },
      TextBlock.markup,
    ],
    attrs: {
      body: {
        fill: DefaultNodeConfig.fill,
        stroke: DefaultNodeConfig.stroke,
        strokeWidth: DefaultNodeConfig.strokeWidth,
      },
      ...TextBlock.attrs,
    },
    propHooks: (metadata) => {
      ObjectExt.setByPath(
        metadata,
        'attrs/body/refD',
        'M 410,171 C 410,204 322,231 215,231 C 107,231 17,204 17,172 C 17,140 107,113 215,113 C 322,113 410,139 410,171 z M 410,171 L 411,680 C 411,709 323,743 215,743 C 107,743.7014 17,710 17,681 L 17,172',
      );
      return TextBlock.propHooks(metadata);
    },
    attrHooks: {
      ...TextBlock.attrHooks,
    },
    ports: {
      groups: {
        ...TRBL_CENTER_GROUPS,
        lineType: {
          set: lineTypeAttrHooks,
        },
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
        {
          group: 'bottom',
        },
      ],
    },
  },
};
