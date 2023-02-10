import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { HTML_NODE, NODE_NAME, portDefaultStyle, TRBL_CENTER_GROUPS } from '../../Editor/nodes';

export const CLOUD: GroupChildrenItem = {
  label: '云朵',
  config: {
    shape: NODE_NAME.PATH.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH / 1.5,
      path: 'M 2975 2114 C 2903 2114 2885 2164 2942.6 2174 C 2885 2196 2949.8 2244 2996.6 2224 C 3029 2264 3137 2264 3173 2224 C 3245 2224 3245 2184 3200 2164 C 3245 2124 3173 2084 3110 2104 C 3065 2074 2993 2074 2975 2114 Z',
      ports: {
        groups: {
          a: {
            position: {
              name: '云朵链接桩',
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

export const DOC: GroupChildrenItem = {
  label: '文档',
  config: {
    shape: NODE_NAME.PATH.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH / 1.5,
      path: 'M 2805 2014 C 2807.76 2014 2810 2016.24 2810 2019 L 2810 2066.5 Q 2785 2053 2760 2066.5 Q 2735 2080 2710 2066.5 L 2710 2021.5 L 2710 2019 C 2710 2016.24 2712.24 2014 2715 2014 Z',
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
        ],
      },
    },
  },
};

export const CYLINDER: GroupChildrenItem = {
  label: '圆柱',
  config: {
    shape: NODE_NAME.CYLINDER.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH / 1.5,
      // body: {
      //   width: BASE_WIDTH,
      //   height: BASE_WIDTH / 1.5,
      // },
      path: 'M 1367 1435 C 1367 1426.72 1380.43 1420 1397 1420 C 1404.96 1420 1412.59 1421.58 1418.21 1424.39 C 1423.84 1427.21 1427 1431.02 1427 1435 L 1427 1485 C 1427 1493.28 1413.57 1500 1397 1500 C 1380.43 1500 1367 1493.28 1367 1485 Z',
      // markup: [
      //   {
      //     tagName: 'path',
      //     selector: 'aaa',
      //   },
      // ],
      // ports: {
      //   groups: {
      //     ...TRBL_CENTER_GROUPS,
      //   },
      //   items: [
      //     {
      //       group: 'top',
      //     },
      //     {
      //       group: 'left',
      //     },
      //     {
      //       group: 'right',
      //     },
      //     {
      //       group: 'bottom',
      //     },
      //   ],
      // },
    },
  },
};
