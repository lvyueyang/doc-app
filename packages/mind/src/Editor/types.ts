import type { Cell, Graph, Node } from '@antv/x6';
import type { ReactShapeConfig } from '@antv/x6-react-shape';
import type React from 'react';
import type * as layouts from './layout';

export type NodeConfig = Node.Config & {
  inherit?: string | Node.Definition | undefined;
};

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

/** 图标 */
export interface IconDataItem {
  groupName: string;
  iconName: string;
}
export type Icons = IconDataItem[];

/** 标签 */
export interface TagDataItem {
  color: string;
  value: string;
}
export type Tags = TagDataItem[];

/** 备注 */
export interface Remark {
  value: string;
}

export interface BackgroundOptions {
  color: string;
  image: string;
}
export interface EditorJsonForm {
  data: {
    cells: Cell.Properties[];
  };
  page: {
    background: BackgroundOptions;
  };
  /** 主题 ID */
  theme: string;
  /** 布局 */
  layout: string;
  /** 布局配置 */
  layoutOptions: layouts.LayoutOptions;
}
