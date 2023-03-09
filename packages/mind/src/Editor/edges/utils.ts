import { PREFIX } from '../constants';

export const createEdgeName = (name: string) => {
  return `${PREFIX}Edge${name}`;
};
