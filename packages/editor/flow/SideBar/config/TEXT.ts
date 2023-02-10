import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { NODE_NAME } from '../../Editor/nodes';

export const TEXT: GroupChildrenItem = {
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
};
