import type { GroupChildrenItem } from './common';
import { BASE_WIDTH } from './common';
import { NODE_NAME, portDefaultStyle, TRBL_CENTER_GROUPS } from '../../Editor/nodes';

export const CLOUD: GroupChildrenItem = {
  label: '云朵',
  config: {
    shape: NODE_NAME.PATH.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH / 1.5,
      path: 'M 2975 2114 C 2903 2114 2885 2164 2942.6 2174 C 2885 2196 2949.8 2244 2996.6 2224 C 3029 2264 3137 2264 3173 2224 C 3245 2224 3245 2184 3200 2164 C 3245 2124 3173 2084 3110 2104 C 3065 2074 2993 2074 2975 2114 Z',
      // ports: {
      //   groups: {
      //     a: {
      //       position: {
      //         name: '云朵链接桩',
      //       },
      //       attrs: {
      //         ...portDefaultStyle,
      //       },
      //     },
      //   },
      //   items: [
      //     {
      //       group: 'a',
      //     },
      //     {
      //       group: 'a',
      //     },
      //     {
      //       group: 'a',
      //     },
      //     {
      //       group: 'a',
      //     },
      //     {
      //       group: 'a',
      //     },
      //     {
      //       group: 'a',
      //     },
      //   ],
      // },
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
    shape: NODE_NAME.PATH.name,
    option: {
      width: BASE_WIDTH / 1.5,
      height: BASE_WIDTH,
      path: 'M 410,171 C 410,204 322,231 215,231 C 107,231 17,204 17,172 C 17,140 107,113 215,113 C 322,113 410,139 410,171 z M 410,171 L 411,680 C 411,709 323,743 215,743 C 107,743.7014 17,710 17,681 L 17,172',
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

export const TAPE: GroupChildrenItem = {
  label: '条带',
  config: {
    shape: NODE_NAME.PATH.name,
    option: {
      width: BASE_WIDTH,
      height: BASE_WIDTH / 1.5,
      path: 'M 1955 1260 Q 1985 1296 2015 1260 Q 2045 1224 2075 1260 L 2075 1320 Q 2045 1284 2015 1320 Q 1985 1356 1955 1320 L 1955 1260 Z',
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
