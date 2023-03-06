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
  FanNodeConfig,
  Fan2NodeConfig,
  DropNodeConfig,
  HeartNodeConfig,
  SubprocessNodeConfig,
  StoredataNodeConfig,
  QueueNodeConfig,
  OctagonNodeConfig,
  ManualInputNodeConfig,
  CardNodeConfig,
  DisplayNodeConfig,
  ParallelNodeConfig,
  LoopLimitNodeConfig,
  OrNodeConfig,
  OffPageReferenceNodeConfig,
  Diamond2NodeConfig,
  SortNodeConfig,
  MdBracketsNodeConfig,
  LgBracketsNodeConfig,
  ArrowNodeConfig,
} from '../../Editor/nodes';
import type { GroupItem } from './common';
import { BASE_WIDTH } from './common';

export const baseShape: GroupItem = {
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
      label: '开始/结束',
      config: {
        shape: RectNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 2,
          attrs: {
            body: {
              refRy: '50%',
              refRx: '15%',
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
      label: '等腰三角形',
      config: {
        shape: Diamond2NodeConfig.NODE_NAME,
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
    {
      label: '扇形',
      config: {
        shape: FanNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH / 1.5,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '半扇形',
      config: {
        shape: Fan2NodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 1.5,
        },
      },
    },
    {
      label: '水滴',
      config: {
        shape: DropNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH / 1.5,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '心形',
      config: {
        shape: HeartNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '子流程',
      config: {
        shape: SubprocessNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 1.5,
        },
      },
    },
    {
      label: '内部存储',
      config: {
        shape: StoredataNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '队列数据',
      config: {
        shape: QueueNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '人工输入',
      config: {
        shape: ManualInputNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 1.5,
        },
      },
    },
    {
      label: '卡片',
      config: {
        shape: CardNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 1.5,
        },
      },
    },
    {
      label: '展示',
      config: {
        shape: DisplayNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 1.5,
        },
      },
    },
    {
      label: '并行',
      config: {
        shape: ParallelNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 1.5,
        },
      },
    },
    {
      label: '循环限值',
      config: {
        shape: LoopLimitNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 1.5,
        },
      },
    },
    {
      label: '或',
      config: {
        shape: OrNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '求和',
      config: {
        shape: OrNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH,
          attrs: {
            shape: {
              style: {
                transform: 'rotate(45deg)',
              },
            },
          },
        },
      },
    },
    {
      label: '跨页引用',
      config: {
        shape: OffPageReferenceNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '排序',
      config: {
        shape: SortNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH,
        },
      },
    },
    {
      label: '箭头',
      config: {
        shape: ArrowNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH,
          height: BASE_WIDTH / 2,
        },
      },
    },
    {
      label: '中括号(左)',
      config: {
        shape: MdBracketsNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH / 3,
          height: BASE_WIDTH,
          ports: {
            items: [
              {
                group: 'left',
              },
            ],
          },
        },
      },
    },
    {
      label: '中括号(右)',
      config: {
        shape: MdBracketsNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH / 3,
          height: BASE_WIDTH,
          ports: {
            items: [
              {
                group: 'right',
              },
            ],
          },
          attrs: {
            shape: {
              style: {
                transform: 'rotate(180deg)',
              },
            },
          },
        },
      },
    },
    {
      label: '大括号(左)',
      config: {
        shape: LgBracketsNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH / 3,
          height: BASE_WIDTH,
          ports: {
            items: [
              {
                group: 'left',
              },
            ],
          },
        },
      },
    },
    {
      label: '大括号(右)',
      config: {
        shape: LgBracketsNodeConfig.NODE_NAME,
        option: {
          width: BASE_WIDTH / 3,
          height: BASE_WIDTH,
          ports: {
            items: [
              {
                group: 'right',
              },
            ],
          },
          attrs: {
            shape: {
              style: {
                transform: 'rotate(180deg)',
              },
            },
          },
        },
      },
    },
  ],
};
