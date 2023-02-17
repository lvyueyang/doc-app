import { CIRCLE, ELLIPSE } from './CIRCLE';
import { CLOUD, CYLINDER, DOC, TAPE } from './PATH';
import type { GroupItem } from './common';
import { BASE_WIDTH } from './common';
import { DIAMOND } from './DIAMOND';
import { PARALLELOGRAM, RECT_RADIUS, SQUARE } from './RECT';
import { TRIANGLE } from './TRIANGLE';
import {
  TextNodeConfig,
  RectNodeConfig,
  EllipseNodeConfig,
  CircleNodeConfig,
  TriangleNodeConfig,
  DiamondNodeConfig,
} from '../../nodes';

const groupList: GroupItem[] = [
  {
    groupName: '基础图形',
    children: [
      {
        label: '文本',
        config: {
          shape: TextNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
            text: '文本',
          },
        },
      },
      {
        label: '矩形',
        config: {
          shape: RectNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
          },
        },
      },
      {
        label: '圆角矩形',
        config: {
          shape: RectNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
            attrs: {
              body: {
                rx: 10,
              },
            },
          },
        },
      },
      {
        label: '椭圆',
        config: {
          shape: EllipseNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
            text: '椭圆',
          },
        },
      },
      {
        label: '圆',
        config: {
          shape: CircleNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
            text: '圆',
          },
        },
      },
      {
        label: '正方形',
        config: {
          shape: RectNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
          },
        },
      },
      {
        label: '菱形',
        config: {
          shape: TriangleNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
            text: '菱形',
          },
        },
      },
      {
        label: '三角形',
        config: {
          shape: DiamondNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
            text: '三角形',
          },
        },
      },
      // DIAMOND,
      PARALLELOGRAM,
      CLOUD,
      DOC,
      CYLINDER,
      TAPE,
    ],
  },
];

export default groupList;
