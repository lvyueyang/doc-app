import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { NODE_NAME, portDefaultStyle, TRBL_CENTER_GROUPS } from '../../Editor/nodes';

export const RECT: GroupChildrenItem = {
  label: '矩形',
  config: {
    shape: NODE_NAME.RECT.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH / 2,
    },
  },
};

export const RECT_RADIUS: GroupChildrenItem = {
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
};

export const SQUARE: GroupChildrenItem = {
  label: '正方形',
  config: {
    shape: NODE_NAME.RECT.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH,
    },
  },
};

export const PARALLELOGRAM: GroupChildrenItem = {
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
            group: 'bottom',
          },
        ],
      },
    },
  },
};
