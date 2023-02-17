import type { NodeConfig, NODE_NAME_ENUM } from '../../Editor/nodes';

export interface GroupChildrenItem {
  label: string;
  config: {
    shape: string;
    option?: NodeConfig;
  };
}
export interface GroupItem {
  groupName: string;
  children: GroupChildrenItem[];
}

export const BASE_WIDTH = 60;
