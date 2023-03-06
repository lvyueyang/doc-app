import type { NodeConfig } from '../../Editor/types';

export interface GroupChildrenItem {
  label: string;
  type?: 'edge' | 'node';
  config: {
    shape: string;
    option?: NodeConfig;
  };
}
export interface GroupItem {
  groupName: string;
  type?: 'edge' | 'node';
  children: GroupChildrenItem[];
}

export const BASE_WIDTH = 60;
