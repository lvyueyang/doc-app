import { ObjectExt } from '@antv/x6';
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
    type: 'rect',
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
    type: 'rect',
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
    type: 'circle',
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
    type: 'ellipse',
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
    type: 'polygon',
    config: createNode({
      inherit: 'polygon',
    }),
  },
  POLYLINE: {
    name: `${prefix}-polyline`,
    cname: '折线',
    type: 'polyline',
    config: createNode({
      inherit: 'polyline',
    }),
  },
  PATH: {
    name: `${prefix}-path`,
    cname: '路径',
    config: createNode({
      inherit: 'path',
      attrs: {
        body: {
          fill: '#fff',
        },
      },
    }),
  },
  IMAGE: {
    name: `${prefix}-image`,
    cname: '图片',
    type: 'image',
    config: createNode({
      inherit: 'image',
    }),
  },
  CYLINDER: {
    name: `${prefix}-cylinder`,
    cname: '圆柱',
    config: createNode({
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'path',
          selector: 'path1',
        },
        {
          tagName: 'path',
          selector: 'path2',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          fill: 'none',
          stroke: 'none',
          pointerEvents: 'all',
        },
        path1: {
          fill: 'none',
          stroke: '#000',
          strokeWidth: 2,
        },
        path2: {
          fill: 'none',
          stroke: '#000',
          strokeWidth: 2,
        },
      },
      propHooks(metadata) {
        const { path1, path2, ...others } = metadata;
        console.log('metadata: ', metadata);
        const PATH1 = ' M 1 7 C 23.5 1 68.5 1  88 7 L 88 52 C 65.5 58 23.5 58  1 52 Z';
        const PATH2 = ' M 1 7 C 23.5 13 68.5 13  88 7';

        ObjectExt.setByPath(others, 'attrs/path1/refD', PATH1);
        ObjectExt.setByPath(others, 'attrs/path2/refD', PATH2);
        return others;
      },
    }),
  },
} as const;

export type NODE_NAME_ENUM = typeof NODE_NAME[keyof typeof NODE_NAME]['name'];
