import {
  TextNodeConfig,
  RectNodeConfig,
  EllipseNodeConfig,
  CircleNodeConfig,
  TriangleNodeConfig,
  DiamondNodeConfig,
  ParallelogramNodeConfig,
  DocNodeConfig,
  CylinderNodeConfig,
  TapeNodeConfig,
  PentagonNodeConfig,
  HexagonNodeConfig,
  CloudNodeConfig,
} from '../../Editor/nodes';
import type { NodeConfig } from '../../Editor/nodes/types';

export interface GroupChildrenItem {
  label: string;
  config: {
    shape: string;
    option?: NodeConfig;
  };
}
export interface GroupItem {
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
            text: '矩形',
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
            text: '圆角矩形',
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
            text: '正方形',
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
      {
        label: '平行四边形',
        config: {
          shape: ParallelogramNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 2,
            text: '平行四边形',
          },
        },
      },
      {
        label: '云朵',
        config: {
          shape: CloudNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 1.5,
            text: '云朵',
          },
        },
      },
      {
        label: '文档',
        config: {
          shape: DocNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 1.5,
            text: '文档',
          },
        },
      },
      {
        label: '圆柱',
        config: {
          shape: CylinderNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH / 1.5,
            height: BASE_WIDTH,
            text: '圆柱',
          },
        },
      },
      {
        label: '条带',
        config: {
          shape: TapeNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH / 1.5,
            text: '条带',
          },
        },
      },
      {
        label: '五边形',
        config: {
          shape: PentagonNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
            text: '五边形',
          },
        },
      },
      {
        label: '六边形',
        config: {
          shape: HexagonNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
            text: '六边形',
          },
        },
      },
    ],
  },
];

export default groupList;
