import type { Edge } from '@antv/x6';

export type EdgeConfig = Edge.Config & {
  inherit?: string | Edge.Definition | undefined;
};

export interface KMSvgEdge {
  EDGE_NAME: string;
  config: EdgeConfig;
  force?: boolean;
}

export type KMEdge = KMSvgEdge;

export type TypeValue<T> = T[keyof T];
