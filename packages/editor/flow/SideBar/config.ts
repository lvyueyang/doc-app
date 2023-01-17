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
      {
        label: '平行四边形',
        config: {
          shape: NODE_NAME.POLYGON.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
            points: [
              [0, 0],
              [20, 0],
              [25, -5],
              [5, -5],
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
      {
        label: '云朵',
        config: {
          shape: NODE_NAME.PATH.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 1.5,
            path: 'M 2975 2114 C 2903 2114 2885 2164 2942.6 2174 C 2885 2196 2949.8 2244 2996.6 2224 C 3029 2264 3137 2264 3173 2224 C 3245 2224 3245 2184 3200 2164 C 3245 2124 3173 2084 3110 2104 C 3065 2074 2993 2074 2975 2114 Z',
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
      {
        label: '文档',
        config: {
          shape: NODE_NAME.PATH.name,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 1.5,
            path: 'M 2805 2014 C 2807.76 2014 2810 2016.24 2810 2019 L 2810 2066.5 Q 2785 2053 2760 2066.5 Q 2735 2080 2710 2066.5 L 2710 2021.5 L 2710 2019 C 2710 2016.24 2712.24 2014 2715 2014 Z',
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
