import { CIRCLE, ELLIPSE } from './CIRCLE';
import { CLOUD, CYLINDER, DOC } from './PATH';
import type { GroupItem } from './common';
import { DIAMOND } from './DIAMOND';
import { PARALLELOGRAM, RECT, RECT_RADIUS, SQUARE } from './RECT';
import { TEXT } from './TEXT';
import { TRIANGLE } from './TRIANGLE';

const groupList: GroupItem[] = [
  {
    groupName: '基础图形',
    children: [
      TEXT,
      RECT,
      RECT_RADIUS,
      ELLIPSE,
      CIRCLE,
      SQUARE,
      TRIANGLE,
      DIAMOND,
      PARALLELOGRAM,
      CLOUD,
      DOC,
      CYLINDER,
    ],
  },
];

export default groupList;
