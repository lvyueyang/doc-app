import type { Cell, Node } from '@antv/x6';
import type { MindMapResult } from '@kangmi/types';
import { downloadJson } from '@kangmi/utils';
import { EventEmitter } from 'events';
import { cloneDeep } from 'lodash';
import { MindMapLRConnector } from '../Editor/connector';
import type { BaseEditorOptions } from './BaseEditor';
import { BaseEditor } from './BaseEditor';
import { MindMapEdgeConfig } from './edges';
import * as layouts from './layout';
import { BranchNodeConfig, ChildNodeConfig, RootNodeConfig } from './nodes';
import * as mindMapTheme from './theme';
import type { MindMapTheme } from './theme/types';
import type { IconDataItem, Icons, NodeConfig } from './types';
import { cells2Tree, shape2Theme } from './utils';

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

type EditorOptions = BaseEditorOptions;

export class Editor extends BaseEditor {
  options: BaseEditorOptions;
  eventEmitter = new EventEmitter();
  /** 主题 */
  theme: MindMapTheme = mindMapTheme.defaultTheme;
  /** 结构布局*/
  layoutType: string = layouts.MindMapHLayout.name;

  /** 画布标题 */
  private title: string = '';

  constructor(options: EditorOptions) {
    super(options as BaseEditorOptions);
    this.options = options;

    this.bindEvent();
    this.graph.drawBackground(this.theme.background);
  }

  // 创建节点
  createNode = (shape: string, config?: NodeConfig) => {
    const { node, size, content } = shape2Theme(shape, this.theme);
    return this.graph.createNode({
      shape,
      width: size.width,
      height: size.height,
      ...config,
      attrs: {
        ...config?.attrs,
        body: {
          ...config?.attrs?.body,
          style: { ...node },
        },
        label: {
          ...config?.attrs?.label,
          style: {
            ...content,
          },
        },
      },
    });
  };

  /** 创建根节点 */
  createRootNode = (config?: NodeConfig) => {
    return this.createNode(RootNodeConfig.NODE_NAME, {
      ...config,
      attrs: {
        label: {
          text: '中心主题',
        },
      },
    });
  };
  /** 创建分支节点 */
  createBranchNode = (config?: NodeConfig) => {
    return this.createNode(BranchNodeConfig.NODE_NAME, {
      ...config,
      attrs: {
        label: {
          text: '分支主题',
        },
      },
    });
  };
  /** 创建子节点 */
  createChildNode = (config?: NodeConfig) => {
    return this.createNode(ChildNodeConfig.NODE_NAME, {
      ...config,
      attrs: {
        label: {
          text: '子主题',
        },
      },
    });
  };

  /** 添加根节点 */
  appendRootNode = (options?: { isCenter?: boolean }) => {
    let center;
    if (options?.isCenter) {
      center = this.graph.getGraphArea().center;
    }
    this.graph.addNode(
      this.createRootNode({
        ...center,
      }),
    );
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

      // this.layout(childNode.id);

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

      // this.layout(childNode.id);

      return childNode;
    }
    return false;
  };

  /** 布局 */
  layout = (nodeId?: string) => {
    const json = this.graph.toJSON();
    const treeData = cells2Tree(json.cells);

    if (!treeData) return;

    const { layout, createEdgeConfig } =
      Object.values(layouts).find(({ name }) => name === this.layoutType) || {};

    const result = layout?.(treeData);

    if (!result) return;

    const cells: Cell[] = [];
    const traverse = (hierarchyItem: MindMapResult) => {
      if (hierarchyItem) {
        const { data, children } = hierarchyItem;
        const position = {
          x: hierarchyItem.x,
          y: hierarchyItem.y,
        };
        const node = this.graph.createNode({
          shape: data.type,
          id: data.id,
          ...position,
          width: data.width,
          height: data.height,
          type: data.type,
          attrs: {
            ...data.data.attrs,
          },
          data: data.data.data,
          children: children?.map((i) => i.id),
        });
        cells.push(node);
        if (children) {
          children.forEach((child) => {
            const edgeLayoutConfig = createEdgeConfig?.(hierarchyItem, child);
            const edge = this.graph.createEdge({
              shape: MindMapEdgeConfig.EDGE_NAME,
              connector: {
                name: MindMapLRConnector.NAME,
                ...edgeLayoutConfig?.connector,
                args: {
                  type: this.theme.branchNodeEdge.type,
                  ...edgeLayoutConfig?.connector?.args,
                },
              },
              source: {
                ...edgeLayoutConfig,
                cell: hierarchyItem.id,
                ...edgeLayoutConfig?.source,
                anchor: edgeLayoutConfig?.source?.anchor,
              },
              target: {
                cell: child.id,
                anchor: edgeLayoutConfig?.target?.anchor,
              },
              attrs: {
                line: {
                  ...shape2Theme(data.type, this.theme)?.edge,
                },
              },
            });
            cells.push(edge);
            traverse(child);
          });
        }
      }
    };
    traverse(result);

    this.graph.resetCells(cells);

    if (nodeId) {
      this.graph.cleanSelection();
      this.graph.select(nodeId);
      const node = this.graph.getCellById(nodeId);
      if (node.isNode()) {
        if (node.shape === RootNodeConfig.NODE_NAME) {
          this.contentCenter();
          return;
        }
        // 判断是否超出了屏幕
        const pos = this.graph.localToPage(node.getPosition());
        const size = node.getSize();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        if (
          pos.x + size.width > windowWidth - 300 ||
          pos.x < 70 ||
          pos.y + size.height > windowHeight ||
          pos.y < 100
        ) {
          this.contentCenter();
        }
        if (node.shape === RootNodeConfig.NODE_NAME) {
          this.contentCenter();
        }
      }
    }
    this.emit('layout');
  };
  /** 设置布局方式 */
  setLayout = (type: string) => {
    this.layoutType = type;
    this.layout();
    const root = this.graph.getRootNodes().find((item) => item.shape === RootNodeConfig.NODE_NAME);
    if (root) {
      this.graph.cleanSelection();
      this.graph.select(root);
    }
    this.graph.centerContent();
  };

  /** 为节点添加表情 */
  addIcon = (node: Node, groupName: string, iconName: string, isOnly: boolean) => {
    if (!node) return;
    const nodeData = node.data || {};
    let icons: Icons = cloneDeep(nodeData.icons) || [];
    const iconItem: IconDataItem = {
      groupName,
      iconName,
    };

    if (!icons.length) {
      icons.push(iconItem);
    } else {
      const findIcon = icons.find(
        (i) => i.groupName === iconItem.groupName && i.iconName === iconItem.iconName,
      );

      if (findIcon) {
        // 已存在直接删除
        this.removeIcon(node, iconItem.iconName);
        return;
      }

      const findGroupIcon = icons.find((i) => i.groupName === iconItem.groupName);
      if (findGroupIcon && isOnly) {
        icons = icons.map((icon) => {
          if (icon.groupName === iconItem.groupName) {
            return iconItem;
          }
          return icon;
        });
      } else {
        icons.push(iconItem);
      }
    }
    node.setData({ ...nodeData, icons });
  };
  /** 为节点删除表情 */
  removeIcon(node: Node<Node.Properties>, iconName: string) {
    const nodeData = node.data || {};
    const icons: Icons = cloneDeep(nodeData.icons) || [];
    node.setData(
      {
        ...nodeData,
        icons: icons.filter((icon) => icon.iconName !== iconName),
      },
      {
        deep: false,
      },
    );
  }

  /** 更换主题 */
  setTheme(theme: MindMapTheme) {
    this.theme = theme;
    const cells = this.graph.getCells();
    cells.forEach((cell) => {
      if (cell.isNode()) {
        const shape = cell.shape;
        cell.setAttrs({
          body: {
            style: { ...shape2Theme(shape, theme)?.node },
          },
          label: {
            style: { ...shape2Theme(shape, theme)?.content },
          },
        });
      }
      if (cell.isEdge()) {
        const shape = cell.getTargetCell()?.shape;
        if (shape) {
          cell.setAttrs({
            line: {
              ...shape2Theme(shape, theme)?.edge,
            },
          });
        }
      }
    });
    this.graph.drawBackground({
      color: theme.background.color,
    });
  }

  contentCenter = () => {
    const selectNode = this.graph.getSelectedCells()[0];
    if (selectNode) {
      this.graph.centerCell(selectNode);
    } else {
      const rootNode = this.graph.getRootNodes().find((r) => r.shape === RootNodeConfig.NODE_NAME);
      if (rootNode) {
        this.graph.centerCell(rootNode);
      }
    }
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
    // 节点变化，重新布局
    graph.on('node:added', (e) => {
      this.layout(e.cell.id);
    });
    let removeNodeTimer: NodeJS.Timeout;
    graph.on('node:removed', () => {
      clearTimeout(removeNodeTimer);
      removeNodeTimer = setTimeout(() => {
        this.layout();
      }, 40);
    });
    graph.on('node:resized', (e) => {
      this.layout(e.cell.id);
    });

    this.on('node:autoresize', (e) => {
      this.layout(e.id);
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
