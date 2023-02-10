import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { NODE_NAME, portDefaultStyle } from '../../Editor/nodes';

export const DIAMOND: GroupChildrenItem = {
  label: '三角形',
  config: {
    shape: NODE_NAME.POLYGON.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH,
      points: [
        [0, 0],
        [0, -10],
        [10, -5],
      ],
      ports: {
        groups: {
          a: {
            position: {
              name: '三角形链接桩',
            },
            attrs: {
              ...portDefaultStyle,
            },
          },
        },
        items: [
          {
            group: 'a',
          },
          {
            group: 'a',
          },
          {
            group: 'a',
          },
          {
            group: 'a',
          },
          {
            group: 'a',
          },
          {
            group: 'a',
          },
        ],
      },
    },
  },
};
