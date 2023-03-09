import Hierarchy from '@antv/hierarchy';
import type { Cell } from '@antv/x6';
import type { MindMapData, MindMapResult } from '@kangmi/types';
import { downloadJson } from '@kangmi/utils';
import type { BaseEditorOptions } from './BaseEditor';
import { BaseEditor } from './BaseEditor';
import { MindmapEdgeConfig } from './edges';
import type { EdgeConfig } from './edges/types';
import { BranchNodeConfig, ChildNodeConfig, RootNodeConfig } from './nodes';
import type { NodeConfig } from './types';

interface BackgroundOptions {
  color: string;
  image: string;
}

interface EditorJsonForm {
  data: {
    cells: Cell.Properties[];
  };
  page: {
    background: BackgroundOptions;
  };
}

interface AppendNodeOptions {
  /** 是否添加到画布中心 */
  center: boolean;
}

type EditorOptions = BaseEditorOptions;

export class Editor extends BaseEditor {
  options: BaseEditorOptions;

  /** 画布标题 */
  private title: string = '';

  constructor(options: EditorOptions) {
    super(options as BaseEditorOptions);
    this.options = options;

    this.bindEvent();
  }

  /** 添加根节点 */
  appendRootNode = (config?: NodeConfig) => {
    this.appendNode(RootNodeConfig.NODE_NAME, {
      width: 120,
      height: 50,
      ...config,
      attrs: {
        body: {},
        label: {
          text: 'root',
        },
        ...config?.attrs,
      },
    });
  };
  /** 创建分支节点 */
  createBranchNode = (config?: NodeConfig) => {
    return this.graph.createNode({
      shape: BranchNodeConfig.NODE_NAME,
      width: 100,
      height: 40,
      ...config,
      attrs: {
        label: {
          text: '分支主题',
        },
        ...config?.attrs,
      },
    });
  };
  /** 创建子节点 */
  createChildNode = (config?: NodeConfig) => {
    return this.graph.createNode({
      shape: ChildNodeConfig.NODE_NAME,
      width: 100,
      height: 40,
      ...config,
      attrs: {
        label: {
          text: '子主题',
        },
        ...config?.attrs,
      },
    });
  };
  /** 添加子节点 */
  appendChildNode = () => {
    const selectedNode = this.graph.getSelectedCells().filter((cell) => cell.isNode())[0];

    if (selectedNode) {
      const childNode =
        selectedNode.shape === RootNodeConfig.NODE_NAME
          ? this.createBranchNode()
          : this.createChildNode();
      childNode.addTo(selectedNode);
      this.layout();
      this.graph.cleanSelection();
      this.graph.select(childNode.id);
      return childNode;
    }
    return false;
  };
  /** 添加兄弟节点 */
  appendNeighborNode = () => {
    const selectedNode = this.graph.getSelectedCells().filter((cell) => cell.isNode())[0];

    if (selectedNode) {
      const selectedNodeId = selectedNode?.id;
      const parent = this.graph
        .getNodes()
        .find((node) => node.getChildren()?.find((c) => c.id === selectedNodeId));

      if (!parent) return false;
      const childNode =
        parent.shape === RootNodeConfig.NODE_NAME
          ? this.createBranchNode()
          : this.createChildNode();
      const index = parent?.getChildren()?.indexOf(selectedNode) || 0;
      childNode.insertTo(parent, index + 1);
      this.layout();
      this.graph.cleanSelection();
      this.graph.select(childNode.id);
      return childNode;
    }
    return false;
  };

  /** 布局 */
  layout = () => {
    const data = this.graph.toJSON();
    const treedata = cells2Tree(data.cells);
    if (!treedata) return;
    const result: MindMapResult = Hierarchy.mindmap(treedata, {
      getHeight(d: MindMapData) {
        return d.height;
      },
      getWidth(d: MindMapData) {
        return d.width;
      },
      getHGap() {
        return 40;
      },
      getVGap() {
        return 20;
      },
      getSide: () => {
        return 'right';
      },
    });

    const cells: Cell[] = [];
    const traverse = (hierarchyItem: MindMapResult) => {
      if (hierarchyItem) {
        const { data, children } = hierarchyItem;

        const node = this.graph.createNode({
          shape: data.type,
          id: data.id,
          x: hierarchyItem.x,
          y: hierarchyItem.y,
          width: data.width,
          height: data.height,
          type: data.type,
          attrs: {
            ...data.data.attrs,
          },
          children: children?.map((i) => i.id),
        });
        cells.push(node);
        if (children) {
          children.forEach((item) => {
            const { id, data } = item;
            cells.push(
              this.graph.createEdge({
                shape: MindmapEdgeConfig.EDGE_NAME,
                source: {
                  cell: hierarchyItem.id,
                  anchor:
                    data.type === ChildNodeConfig.NODE_NAME
                      ? {
                          name: 'right',
                          args: {
                            dx: -16,
                          },
                        }
                      : {
                          name: 'center',
                          args: {
                            dx: '25%',
                          },
                        },
                },
                target: {
                  cell: id,
                  anchor: {
                    name: 'left',
                  },
                },
              }),
            );
            traverse(item);
          });
        }
      }
    };
    traverse(result);

    this.graph.resetCells(cells);
    this.graph.centerContent();
  };

  /** 绑定事件 */
  bindEvent = () => {
    const { graph } = this;
    // 添加子节点
    graph.bindKey(['tab'], (e) => {
      e.preventDefault();
      this.appendChildNode();
    });
    // 添加兄弟节点
    graph.bindKey(['enter'], (e) => {
      e.preventDefault();
      this.appendNeighborNode();
    });
  };

  /** 添加节点 */
  appendNode = (shape: string, config?: NodeConfig, options?: AppendNodeOptions) => {
    const conf: NodeConfig = {
      ...config,
    };
    const opt = appendNodeDefaultOptions(options);
    if (opt?.center) {
      const {
        center: { x, y },
      } = this.graph.getGraphArea();
      conf.x = x;
      conf.y = y;
    }
    return this.graph.addNode({
      shape,
      ...conf,
    });
  };
  /** 添加边 */
  appendEdge = (shape: string, config?: EdgeConfig, options?: AppendNodeOptions) => {
    const conf: EdgeConfig = {
      ...config,
    };
    const opt = appendNodeDefaultOptions(options);
    if (opt?.center) {
      const {
        center: { x, y },
      } = this.graph.getGraphArea();
      conf.target = { x: x + 50, y: y - 50 };
      conf.source = { x: x - 50, y: y + 50 };
      conf.vertices = [
        {
          x,
          y,
        },
      ];
    }
    return this.graph.addEdge({
      shape,
      ...conf,
    });
  };
  /** 获取背景 */
  getBackground = () => {
    const dom = this.graph.container.parentElement!.querySelector('.x6-graph-scroller-background');
    const style = getComputedStyle(dom!);
    const result = {
      color: style.backgroundColor,
      image: style.backgroundImage,
    };
    return result;
  };

  setTitle = (title: string) => {
    this.title = title;
  };
  getTitle = () => {
    return this.title;
  };
  getFileName = () => {
    return this.title || `flow-${Date.now()}`;
  };

  fromJSON = (value: EditorJsonForm) => {
    this.graph.fromJSON(value.data);
    this.graph.drawBackground({
      color: value.page.background.color,
    });
  };

  /** 导出 JSON 数据 */
  toJson = (): EditorJsonForm => {
    const json = this.graph.toJSON();
    return {
      data: json,
      page: {
        background: this.getBackground(),
      },
    };
  };
  /**
   * 导出 JSON 文件
   */
  exportJSON = () => {
    const json = this.toJson();
    const str = JSON.stringify(json);
    downloadJson(str, this.getFileName());
  };
  /**
   * 导出 PNG 图片
   * @param transparent 是否为透明背景 默认 false
   */
  exportPNG = (transparent: boolean = false) => {
    this.graph.exportPNG(this.getFileName(), {
      backgroundColor: transparent ? 'transparent' : this.getBackground().color,
      quality: 1,
      padding: 10,
    });
  };
  /**
   * 导出 JPEG 图片
   */
  exportJPEG = () => {
    this.graph.exportJPEG(this.getFileName(), {
      backgroundColor: this.getBackground().color,
      quality: 1,
      padding: 10,
    });
  };
  /**
   * 导出 SVG 图片
   */
  exportSVG = () => {
    this.graph.exportSVG(this.getFileName());
  };
}

function appendNodeDefaultOptions(options?: AppendNodeOptions) {
  return {
    center: true,
    ...options,
  };
}

function cellItem2TreeItem(cell: Cell.Properties) {
  return {
    id: cell.id!,
    type: cell.shape!,
    width: cell.size.width,
    height: cell.size.height,
    data: cell,
  };
}

/** 将平级的数据转换为 tree */
function cells2Tree(cells: Cell.Properties[]) {
  const rootCell = cells.find((cell) => cell.shape === RootNodeConfig.NODE_NAME);
  if (!rootCell) return;
  const root: MindMapData = {
    id: rootCell.id!,
    type: rootCell.shape!,
    width: rootCell.size.width,
    height: rootCell.size.height,
    data: rootCell,
  };
  const traverse = (dataItem: MindMapData) => {
    const children = cells.find((cell) => cell.id === dataItem.id)?.children;
    if (!children) return;

    dataItem.children = children
      .map((item) => {
        const cell = cells.find((c) => c.id === item);
        if (!cell) {
          console.warn(`节点 ${item} 不存在`);
          return;
        }
        return {
          ...cellItem2TreeItem(cell!),
          children: cell.children,
        };
      })
      .filter((item) => !!item) as MindMapData[];

    dataItem.children.forEach((child) => {
      traverse(child);
    });
  };
  traverse(root);

  return root as MindMapData;
}
