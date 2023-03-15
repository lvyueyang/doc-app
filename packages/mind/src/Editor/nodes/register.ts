import { Graph } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { DefaultTextStyle } from '../constants';
import type { KMNode } from '../types';
import * as nodes from './index';
import { lineTypeAttrHooks } from './utils';

Object.values(nodes).forEach((node: KMNode) => {
  if (node.type === 'svg') {
    Graph.registerNode(node.NODE_NAME, {
      ...node.config,
      attrHooks: {
        lineType: {
          set: lineTypeAttrHooks,
        },
        ...node.config?.attrHooks,
      },
    });
  } else {
    const { NODE_NAME, Component, ports, ...config } = node;
    register({
      shape: NODE_NAME,
      component: Component,
      ports,
      ...config,
      attrs: {
        label: {
          ...config.attrs?.label,
          style: {
            ...DefaultTextStyle,
            ...config.attrs?.label?.style,
          },
        },
      },
    });
  }
});
