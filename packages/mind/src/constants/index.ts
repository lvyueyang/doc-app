import type { TypeValue } from '@kangmi/types';

export const LINE_TYPE = {
  SOLID: {
    code: 'solid',
    cname: '实线',
  },
  DASHED: {
    code: 'dashed',
    cname: '虚线',
  },
  DOTTED: {
    code: 'dotted',
    cname: '点线',
  },
} as const;

export type LINE_TYPE_ENUM = TypeValue<typeof LINE_TYPE>['code'];
