import { Graph, Shape } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { DefaultNodeConfig, DefaultTextStyle, TextEditorClassName } from '../constants';
import type { KMNode } from '../types';
import * as nodes from './index';
import { lineTypeAttrHooks } from './utils';

/** 为文字节点设置 className */
Shape.TextBlock.config({
  attrs: {
    label: {
      class: TextEditorClassName,
      style: {
        ...DefaultTextStyle,
      },
    },
  },
  attrHooks: {
    text: {
      set(text: string, { elem }) {
        elem.innerHTML = text;
      },
      position(text, { refBBox, elem }) {
        if (elem instanceof SVGElement) {
          return refBBox.getCenter();
        }
      },
    },
  },
});

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
        body: {
          fill: DefaultNodeConfig.fill,
          stroke: DefaultNodeConfig.stroke,
          strokeWidth: DefaultNodeConfig.strokeWidth,
          ...config.attrs?.body,
        },
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
