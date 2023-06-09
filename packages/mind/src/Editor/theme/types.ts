import type { ConnectionType } from '../connector';

export type TextContent = React.CSSProperties;

export interface EdgeTheme {
  /** 颜色 */
  stroke: string;
  /** 宽度 */
  strokeWidth: number;
  /** 类型 */
  type: ConnectionType;
}

export interface NodeSize {
  width: number;
  height: number;
}

export interface LayoutConfig {
  /** 水平间距 */
  H_Gap: number;
  /** 垂直间距 */
  V_Gap: number;
}

export type NodeTheme = React.CSSProperties;

export interface MindMapTheme {
  id: string;
  /** 主题名称 */
  themeName: string;

  /** 根 */
  rootNodeSize: NodeSize;
  rootNodeStyle: NodeTheme;
  rootNodeEdge: EdgeTheme;
  rootNodeContent: TextContent;

  /** 分支 */
  branchNodeSize: NodeSize;
  branchNodeStyle: NodeTheme;
  branchNodeEdge: EdgeTheme;
  branchNodeContent: TextContent;

  /** 子节点 */
  childNodeSize: NodeSize;
  childNodeStyle: NodeTheme;
  childNodeEdge: EdgeTheme;
  childNodeContent: TextContent;

  /** 背景 */
  background: {
    color: string;
  };
}
