import { CurveEdgeConfig } from '../../Editor/edges';
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
  StarNodeConfig,
} from '../../Editor/nodes';
import { OctagonNodeConfig } from '../../Editor/nodes/modules/octagon';
import type { NodeConfig } from '../../Editor/types';

export interface GroupChildrenItem {
  label: string;
  type?: 'edge' | 'node';
  config: {
    shape: string;
    option?: NodeConfig;
  };
}
export interface GroupItem {
  groupName: string;
  type?: 'edge' | 'node';
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
          },
        },
      },
      {
        label: '八边形',
        config: {
          shape: OctagonNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
          },
        },
      },
      {
        label: '五角星',
        config: {
          shape: StarNodeConfig.NODE_NAME,
          option: {
            width: BASE_WIDTH,
            height: BASE_WIDTH,
          },
        },
      },
    ],
  },
  {
    groupName: '连线',
    children: [
      {
        label: '曲线',
        type: 'edge',
        config: {
          shape: CurveEdgeConfig.EDGE_NAME,
        },
      },
    ],
  },
];

export default groupList;
