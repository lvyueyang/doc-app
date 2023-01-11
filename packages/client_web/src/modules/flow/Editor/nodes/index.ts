import { createNode } from './common';
export * from './types';

const prefix = 'kangmi';
const portDefaultStyle = {
  circle: {
    magnet: true,
    stroke: '#8f8f8f',
    r: 5,
  },
};

export const NODE_NAME = {
  RECT: {
    name: `${prefix}-rect`,
    cname: '矩形',
    config: createNode({
      inherit: 'rect',
      width: 120,
      height: 60,
      ports: {
        groups: {
          topLeft: {
            position: {
              name: 'absolute',
              args: { x: 0, y: 0 },
            },
            attrs: {
              ...portDefaultStyle,
            },
          },
          top: {
            position: 'top',
            attrs: {
              ...portDefaultStyle,
            },
          },
          topRight: {
            position: {
              name: 'absolute',
              args: { x: '100%', y: 0 },
            },
            attrs: {
              ...portDefaultStyle,
            },
          },
          right: {
            position: 'right',
            attrs: {
              ...portDefaultStyle,
            },
          },
          bottomRight: {
            position: {
              name: 'absolute',
              args: { x: '100%', y: '100%' },
            },
            attrs: {
              ...portDefaultStyle,
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              ...portDefaultStyle,
            },
          },
          bottomLeft: {
            position: {
              name: 'absolute',
              args: { x: 0, y: '100%' },
            },
            attrs: {
              ...portDefaultStyle,
            },
          },
          left: {
            position: 'left',
            attrs: {
              ...portDefaultStyle,
            },
          },
        },
        items: [
          {
            id: 'topLeft',
            group: 'topLeft',
          },
          {
            id: 'top',
            group: 'top',
          },
          {
            id: 'topRight',
            group: 'topRight',
          },
          {
            id: 'right',
            group: 'right',
          },
          {
            id: 'bottom',
            group: 'bottom',
          },
          {
            id: 'bottomRight',
            group: 'bottomRight',
          },
          {
            id: 'bottomLeft',
            group: 'bottomLeft',
          },
          {
            id: 'left',
            group: 'left',
          },
        ],
      },
    }),
  },
  CIRCLE: {
    name: `${prefix}-circle`,
    cname: '圆形',
    config: createNode({
      inherit: 'circle',
    }),
  },
  ELLIPSE: {
    name: `${prefix}-ellipse`,
    cname: '椭圆',
    config: createNode({
      inherit: 'ellipse',
    }),
  },
  /** 多边形 */
  POLYGON: {
    name: `${prefix}-polygon`,
    cname: '多边形',
    config: createNode({
      inherit: 'polygon',
    }),
  },
  POLYLINE: {
    name: `${prefix}-polyline`,
    cname: '多边形',
    config: createNode({
      inherit: 'polyline',
    }),
  },
} as const;

export type NODE_NAME_ENUM = typeof NODE_NAME[keyof typeof NODE_NAME]['name'];
