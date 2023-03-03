/**
 * 文本
 */
import type { KMSvgNode } from '../../types';
import { createNodeName } from '../utils';

export const TextNodeConfig: KMSvgNode = {
  type: 'svg',
  NODE_NAME: createNodeName('Text'),
  config: {
    inherit: 'text-block',
    attrs: {
      body: {
        fill: 'none',
        strokeWidth: 0,
      },
    },
  },
};
