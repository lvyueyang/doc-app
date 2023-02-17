import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { NODE_NAME } from '../../Editor/nodes';
import { TextNode } from '../../nodes';

export const TEXT: GroupChildrenItem = {
  label: '文本',
  config: {
    shape: TextNode.NODE_NAME,
    option: {
      data: {
        label: '文本',
      },
    },
  },
};
