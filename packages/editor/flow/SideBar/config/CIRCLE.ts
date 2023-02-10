import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { NODE_NAME } from '../../Editor/nodes';

export const CIRCLE: GroupChildrenItem = {
  label: '圆形',
  config: {
    shape: NODE_NAME.CIRCLE.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH,
    },
  },
};
export const ELLIPSE: GroupChildrenItem = {
  label: '椭圆',
  config: {
    shape: NODE_NAME.ELLIPSE.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH / 2,
    },
  },
};
