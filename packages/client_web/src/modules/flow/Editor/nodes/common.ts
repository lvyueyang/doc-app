import { Graph } from '@antv/x6';

import type { NodeConfig } from './types';

export interface CreateNodeResult {
  name: string;
  config: NodeConfig;
}

/** 创建一个节点 */
export function createNode(config: NodeConfig) {
  return config;
}

export function registerNodes(nodes: CreateNodeResult[]) {
  nodes.forEach((node) => {
    Graph.registerNode(node.name, node.config);
  });
}
