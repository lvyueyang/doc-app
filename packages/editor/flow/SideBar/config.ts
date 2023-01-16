import type { NodeConfig, NODE_NAME_ENUM } from '../Editor/nodes';
import { TRBL_CENTER_GROUPS } from '../Editor/nodes';
import { portDefaultStyle, TRBL_CORNER_GROUPS } from '../Editor/nodes';
import { NODE_NAME } from '../Editor/nodes';

interface GroupChildrenItem {
  label: string;
  config: {
    shape: NODE_NAME_ENUM;
    option?: NodeConfig;
  };
}
interface GroupItem {
  groupName: string;
  children: GroupChildrenItem[];
}

export const BASE_WIDTH = 60;

const groupList: GroupItem[] = [
  {
    groupName: '基础图形',
    children: [
      {
        label: '文本',
        config: {
          shape: NODE_NAME.TEXT.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
            label: '文本',
            attrs: {
              body: {
                strokeWidth: 0,
                fill: 'rgba(0,0,0,0)',
              },
            },
          },
        },
      },
      {
        label: '矩形',
        config: {
          shape: NODE_NAME.RECT.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
          },
        },
      },
      {
        label: '圆角矩形',
        config: {
          shape: NODE_NAME.RECT.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
            attrs: {
              body: {
                rx: 10,
                ry: 10,
              },
            },
          },
        },
      },
      {
        label: '椭圆',
        config: {
          shape: NODE_NAME.ELLIPSE.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
          },
        },
      },
      {
        label: '圆形',
        config: {
          shape: NODE_NAME.CIRCLE.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
          },
        },
      },
      {
        label: '正方形',
        config: {
          shape: NODE_NAME.RECT.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
          },
        },
      },
      {
        label: '三角形',
        config: {
          shape: NODE_NAME.POLYGON.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
            points: [
              [0, 0],
              [0, -10],
              [10, -5],
            ],
            ports: {
              groups: {
                a: {
                  position: {
                    name: '三角形链接桩',
                  },
                  attrs: {
                    ...portDefaultStyle,
                  },
                },
              },
              items: [
                {
                  group: 'a',
                },
                {
                  group: 'a',
                },
                {
                  group: 'a',
                },
                {
                  group: 'a',
                },
                {
                  group: 'a',
                },
                {
                  group: 'a',
                },
              ],
            },
          },
        },
      },
      {
        label: '菱形',
        config: {
          shape: NODE_NAME.POLYGON.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
            points: [
              [0, 0],
              [5, -10],
              [10, 0],
              [5, 10],
            ],
            ports: {
              groups: {
                ...TRBL_CENTER_GROUPS,
              },
              items: [
                {
                  group: 'top',
                },
                {
                  group: 'left',
                },
                {
                  group: 'right',
                },
                {
                  group: 'bottom',
                },
              ],
            },
          },
        },
      },
      // {
      //   label: '正方形',
      // },
      // {
      //   label: '椭圆',
      // },
      // {
      //   label: '圆形',
      // },
      // {
      //   label: '三角形',
      // },
      // {
      //   label: '直角三角形',
      // },
      // {
      //   label: '菱形',
      // },
      // {
      //   label: '五边形',
      // },
      // {
      //   label: '梯形',
      // },
      // {
      //   label: '圆柱',
      // },
      // {
      //   label: '聊天气泡',
      // },
    ],
  },
];

export default groupList;
