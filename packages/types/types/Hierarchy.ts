import type { Node } from '@antv/x6';
export interface MindMapData<Data = Node.Properties> {
  id: string;
  type: string;
  width: number;
  height: number;
  children?: MindMapData[];
  data: Data;
}

export interface MindMapResult {
  id: string;
  x: number;
  y: number;
  data: MindMapData;
  children?: MindMapResult[];
  depth: number;
  height: number;
  width: number;
  hgap: number;
  preH: number;
  preV: number;
  side: 'left' | 'right';
  startY: number;
  totalHeight: number;
  vgap: number;
}

export interface MindmapOptions {
  direction?: string;
  getId?: (data: MindMapData) => string;
  getPreH?: (data: MindMapData) => number;
  getPreV?: (data: MindMapData) => number;
  getHGap?: (data: MindMapData) => number;
  getVGap?: (data: MindMapData) => number;
  getChildren?: (data: MindMapData) => MindMapData[];
  getHeight?: (data: MindMapData) => number;
  getWidth?: (data: MindMapData) => number;
  getSide?: (data: MindMapData) => string;
}

export interface HierarchyLayout {
  compactBox: any;
  dendrogram: any;
  indented: any;
  mindmap: (root: any, options: MindmapOptions) => MindMapResult;
}
