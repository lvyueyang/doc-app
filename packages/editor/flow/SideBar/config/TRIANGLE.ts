import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { NODE_NAME, TRBL_CENTER_GROUPS } from '../../Editor/nodes';

export const TRIANGLE: GroupChildrenItem = {
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
};
