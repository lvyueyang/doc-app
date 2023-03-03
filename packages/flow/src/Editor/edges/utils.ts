import type { Node, Markup, Cell } from '@antv/x6';
import type { Attr } from '@antv/x6/es/registry';
import { ObjectExt, Shape } from '@antv/x6';
import { PREFIX } from '../constants';

export const createEdgeName = (name: string) => {
  return `${PREFIX}Edge${name}`;
};
