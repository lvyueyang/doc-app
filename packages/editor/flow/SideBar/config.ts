import type { NodeConfig, NODE_NAME_ENUM } from '../Editor/nodes';
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

const groupList: GroupItem[] = [
  {
    groupName: '基础图形',
    children: [
      {
        label: '文本',
        config: {
          shape: NODE_NAME.RECT.name,
          option: {
            width: 30,
            height: 30,
            label: '文本',
            attrs: {
              rect: {
                strokeWidth: 0,
                fill: 'rgba(0,0,0,0)',
              },
            },
          },
        },
      },
      // {
      //   label: '箭头',
      // },
      // {
      //   label: '矩形',
      // },
      // {
      //   label: '圆角矩形',
      // },
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
