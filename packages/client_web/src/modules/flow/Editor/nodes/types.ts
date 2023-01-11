import type { Node } from '@antv/x6';

export type NodeConfig =
  | Node.Definition
  | (Node.Config & {
      inherit?: string | Node.Definition | undefined;
    });
