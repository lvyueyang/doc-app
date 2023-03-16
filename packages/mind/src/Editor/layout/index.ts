import hierarchy from '@antv/hierarchy';
import type { Edge } from '@antv/x6';
import type { MindMapData, MindMapResult } from '@kangmi/types';
import { MindMapTBConnector } from '../connector';

interface CreateEdgeConfigResult {
  connector?: Edge.Config['connector'];
  source?: Partial<Edge.SetCellTerminalArgs>;
  target?: Partial<Edge.SetCellTerminalArgs>;
}

export interface LayoutOptions {
  /** 水平间距 */
  H_Gap: number;
  /** 垂直间距 */
  V_Gap: number;
}

interface LayoutItemConfig {
  name: string;
  cname: string;
  /** 布局算法 */
  layout: (treeData: MindMapData, options: LayoutOptions) => MindMapResult;
  layoutOptions: LayoutOptions;
  /** 边配置 */
  createEdgeConfig: (source: MindMapResult, target: MindMapResult) => CreateEdgeConfigResult;
}

const createLayoutCommonOptions = (options: LayoutOptions) => {
  return {
    // 水平间距
    getHGap(d: MindMapData) {
      if (d.data.visible === false) {
        return 0;
      }
      return options.H_Gap;
    },
    // 垂直间距
    getVGap(d: MindMapData) {
      if (d.data.visible === false) {
        return 0;
      }
      return options.V_Gap;
    },
    getHeight(d: MindMapData) {
      if (d.data.visible === false) {
        return 0;
      }
      return d.height;
    },
    getWidth(d: MindMapData) {
      if (d.data.visible === false) {
        return 0;
      }
      return d.width;
    },
  };
};
export const MindMapHLayout: LayoutItemConfig = {
  name: 'mindmapH',
  cname: '左右分布',
  layoutOptions: {
    H_Gap: 40,
    V_Gap: 20,
  },
  layout: (treeData, options) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'H',
      ...createLayoutCommonOptions(options),
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
  layoutOptions: {
    H_Gap: 40,
    V_Gap: 20,
  },
  layout: (treeData, options) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'H',
      getSide() {
        return 'right';
      },
      ...createLayoutCommonOptions(options),
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
  layoutOptions: {
    H_Gap: 40,
    V_Gap: 20,
  },
  layout: (treeData, options) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'H',
      getSide() {
        return 'left';
      },
      ...createLayoutCommonOptions(options),
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
  layoutOptions: {
    H_Gap: 30,
    V_Gap: 40,
  },
  layout: (treeData, options) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'V',
      ...createLayoutCommonOptions(options),
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
  layoutOptions: {
    H_Gap: 30,
    V_Gap: 40,
  },
  layout: (treeData, options) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'TB',
      ...createLayoutCommonOptions(options),
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
  layoutOptions: {
    H_Gap: 30,
    V_Gap: 40,
  },
  layout: (treeData, options) => {
    const result: MindMapResult = hierarchy.compactBox(treeData, {
      direction: 'BT',
      ...createLayoutCommonOptions(options),
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
