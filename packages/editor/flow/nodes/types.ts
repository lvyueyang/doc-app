import type { Graph, Node } from '@antv/x6';
import type { ReactShapeConfig } from '@antv/x6-react-shape';
import type React from 'react';

export type NodeConfig =
  | Node.Definition
  | (Node.Config & {
      inherit?: string | Node.Definition | undefined;
    });

export interface ReactNodeProps {
  graph: Graph;
  node: Node;
}

export interface KMReactNode extends Omit<ReactShapeConfig, 'shape' | 'component'> {
  NODE_NAME: string;
  Component: React.FC<ReactNodeProps>;
  type?: 'react';
}

export interface KMSvgNode {
  NODE_NAME: string;
  config: NodeConfig;
  type: 'svg';
}

export type KMNode = KMReactNode | KMSvgNode;

export type TypeValue<T> = T[keyof T];
