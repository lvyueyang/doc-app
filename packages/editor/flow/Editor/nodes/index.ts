import { createNode } from './common';
export * from './types';

const prefix = 'kangmi';
export const portDefaultStyle = {
  circle: {
    magnet: true,
    stroke: 'blue',
    r: 0,
  },
};

// 上下左右中心的连接桩
export const TRBL_CENTER_GROUPS = {
  top: {
    position: 'top',
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
  bottom: {
    position: 'bottom',
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
};

// 上下左右顶角的连接桩
export const TRBL_CORNER_GROUPS = {
  topLeft: {
    position: {
      name: 'absolute',
      args: { x: 0, y: 0 },
    },
    attrs: {
      ...portDefaultStyle,
      path: {},
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
  bottomRight: {
    position: {
      name: 'absolute',
      args: { x: '100%', y: '100%' },
    },
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
};

export const NODE_NAME = {
  TEXT: {
    name: `${prefix}-text`,
    cname: '文字',
    config: createNode({
      inherit: 'rect',
      width: 120,
      height: 60,
      attrs: {
        body: {
          strokeWidth: 0,
        },
      },
    }),
  },
  RECT: {
    name: `${prefix}-rect`,
    cname: '矩形',
    config: createNode({
      inherit: 'rect',
      width: 120,
      height: 60,
      ports: {
        groups: {
          ...TRBL_CENTER_GROUPS,
        },
        items: [
          // {
          //   group: 'topLeft',
          // },
          {
            group: 'top',
          },
          // {
          //   group: 'topRight',
          // },
          {
            group: 'right',
          },
          {
            group: 'bottom',
          },
          // {
          //   group: 'bottomRight',
          // },
          // {
          //   group: 'bottomLeft',
          // },
          {
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
      width: 120,
      height: 120,
      ports: {
        groups: {
          ...TRBL_CENTER_GROUPS,
        },
        items: [
          {
            id: 'top',
            group: 'top',
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
            id: 'left',
            group: 'left',
          },
        ],
      },
    }),
  },
  ELLIPSE: {
    name: `${prefix}-ellipse`,
    cname: '椭圆',
    config: createNode({
      inherit: 'ellipse',
      width: 120,
      height: 60,
      ports: {
        groups: {
          ...TRBL_CENTER_GROUPS,
        },
        items: [
          {
            id: 'top',
            group: 'top',
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
            id: 'left',
            group: 'left',
          },
        ],
      },
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
