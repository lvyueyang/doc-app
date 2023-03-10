import hierarchy from '@antv/hierarchy';
import type { Edge } from '@antv/x6';
import type { MindMapData, MindMapResult } from '@kangmi/types';
import { MindMapTBConnector } from '../connector';

interface CreateEdgeConfigResult {
  connector?: Edge.Config['connector'];
  source?: Partial<Edge.SetCellTerminalArgs>;
  target?: Partial<Edge.SetCellTerminalArgs>;
}

interface LayoutItemConfig {
  name: string;
  cname: string;
  /** 布局算法 */
  layout: (treeData: MindMapData) => MindMapResult;
  /** 边配置 */
  createEdgeConfig: (source: MindMapResult, target: MindMapResult) => CreateEdgeConfigResult;
}

export const MindMapHLayout: LayoutItemConfig = {
  name: 'mindmapH',
  cname: '左右分布',
  layout: (treeData: MindMapData) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'H',
      getHGap() {
        // 水平间距
        return 40;
      },
      getVGap() {
        // 垂直间距
        return 20;
      },
    });
    return result;
  },
  createEdgeConfig(source, target) {
    return {
      source: {
        anchor: {
          name: target.side,
        },
      },
      target: {
        anchor: {
          name: target.side === 'left' ? 'right' : 'left',
        },
      },
    };
  },
};

export const MindMapLRLayout: LayoutItemConfig = {
  name: 'mindmapLR',
  cname: '右侧分布',
  layout: (treeData: MindMapData) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'H',
      getSide() {
        return 'right';
      },
      getHGap() {
        // 水平间距
        return 40;
      },
      getVGap() {
        // 垂直间距
        return 20;
      },
    });

    return result;
  },
  createEdgeConfig() {
    return {
      source: {
        anchor: {
          name: 'right',
        },
      },
      target: {
        anchor: {
          name: 'left',
        },
      },
    };
  },
};

export const MindMapRLLayout: LayoutItemConfig = {
  name: 'mindmapRL',
  cname: '左侧分布',
  layout: (treeData: MindMapData) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'H',
      getSide() {
        return 'left';
      },
      getHGap() {
        // 水平间距
        return 40;
      },
      getVGap() {
        // 垂直间距
        return 20;
      },
    });

    return result;
  },
  createEdgeConfig() {
    return {
      source: {
        anchor: {
          name: 'left',
        },
      },
      target: {
        anchor: {
          name: 'right',
        },
      },
    };
  },
};

export const MindMapVLayout: LayoutItemConfig = {
  name: 'mindmapV',
  cname: '上下分布',
  layout: (treeData: MindMapData) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'V',
      getHGap() {
        // 水平间距
        return 30;
      },
      getVGap() {
        // 垂直间距
        return 40;
      },
    });

    return result;
  },
  createEdgeConfig(source, target) {
    return {
      connector: {
        name: MindMapTBConnector.NAME,
      },
      source: {
        anchor: {
          name: target.side === 'left' ? 'top' : 'bottom',
        },
      },
      target: {
        anchor: {
          name: target.side === 'left' ? 'bottom' : 'top',
        },
      },
    };
  },
};

export const MindMapTBLayout: LayoutItemConfig = {
  name: 'mindmapTB',
  cname: '向下分布',
  layout: (treeData: MindMapData) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'TB',
      getHGap() {
        // 水平间距
        return 30;
      },
      getVGap() {
        // 垂直间距
        return 40;
      },
    });

    return result;
  },
  createEdgeConfig(source, target) {
    return {
      connector: {
        name: MindMapTBConnector.NAME,
      },
      source: {
        anchor: {
          name: 'bottom',
        },
      },
      target: {
        anchor: {
          name: 'top',
        },
      },
    };
  },
};

export const MindMapBTLayout: LayoutItemConfig = {
  name: 'mindmapBT',
  cname: '向上分布',
  layout: (treeData: MindMapData) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'BT',
      getHGap() {
        // 水平间距
        return 30;
      },
      getVGap() {
        // 垂直间距
        return 40;
      },
    });

    return result;
  },
  createEdgeConfig(source, target) {
    return {
      connector: {
        name: MindMapTBConnector.NAME,
      },
      source: {
        anchor: {
          name: 'top',
        },
      },
      target: {
        anchor: {
          name: 'bottom',
        },
      },
    };
  },
};
