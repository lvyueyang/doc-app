import type { Cell, Edge, Node } from '@antv/x6';
import type { MindMapResult } from '@kangmi/types';
import { EventEmitter } from 'events';
import { cloneDeep } from 'lodash';
import { MindMapLRConnector } from '../Editor/connector';
import type { BaseEditorOptions } from './BaseEditor';
import { BaseEditor } from './BaseEditor';
import { registerContextMenu } from './contextmenu';
import { MindMapEdgeConfig } from './edges';
import { registerKeyboard } from './keyboard';
import * as layouts from './layout';
import { ExportData } from './modules/ExportData';
import { BranchNodeConfig, ChildNodeConfig, RootNodeConfig } from './nodes';
import * as mindMapTheme from './theme';
import type { MindMapTheme } from './theme/types';
import type {
  EditorJsonForm,
  IconDataItem,
  Icons,
  NodeConfig,
  Remark,
  TagDataItem,
  Tags,
} from './types';
import { cells2Tree, shape2Theme } from './utils';

type DeepCloneNode = Node & { _children?: DeepCloneNode[] };

export class Editor extends BaseEditor {
  options: BaseEditorOptions;
  readonly eventEmitter = new EventEmitter();
  readonly export = new ExportData(this);

  /** 主题 */
  private theme: MindMapTheme = mindMapTheme.defaultTheme;
  /** 结构布局*/
  private layoutType: string = layouts.MindMapHLayout.name;
  /** 布局配置 */
  private layoutOptions: layouts.LayoutOptions = layouts.MindMapHLayout.layoutOptions;
  /** 画布标题 */
  private title: string = '';

  constructor(options: BaseEditorOptions) {
    super(options as BaseEditorOptions);
    this.options = options;

    this.bindEvent();
    this.graph.drawBackground(this.theme.background);
    registerContextMenu(this);
    registerKeyboard(this);
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
        box: {
          ...config?.attrs?.box,
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
    const rootNode = this.createRootNode({
      ...center,
    });
    this.graph.addNode(rootNode);
    this.layout(rootNode.id);
  };
  /** 添加子节点 */
  appendChildNode = (node?: Node) => {
    const selectedNode = this.graph.getSelectedCells().filter((cell) => cell.isNode())[0];
    if (selectedNode) {
      let childNode = node;
      if (!childNode) {
        childNode =
          selectedNode.shape === RootNodeConfig.NODE_NAME
            ? this.createBranchNode()
            : this.createChildNode();
      }

      selectedNode.addChild(this.graph.addNode(childNode));
      this.layout(childNode.id!);
      return childNode;
    }
    return false;
  };
  /** 添加兄弟节点 */
  appendNeighborNode = (node?: Node) => {
    const selectedNode = this.graph.getSelectedCells().filter((cell) => cell.isNode())[0];

    if (selectedNode) {
      const selectedNodeId = selectedNode?.id;
      const parent = this.graph
        .getNodes()
        .find((n) => n.getChildren()?.find((c) => c.id === selectedNodeId));

      if (!parent) return false;

      let childNode = node;
      if (!childNode) {
        childNode =
          parent.shape === RootNodeConfig.NODE_NAME
            ? this.createBranchNode()
            : this.createChildNode();
      }
      const index = parent?.getChildren()?.indexOf(selectedNode) || 0;
      parent.insertChild(this.graph.addNode(childNode), index + 1);
      this.layout(childNode.id);
      return childNode;
    }
    return false;
  };

  /** 布局 */
  layout = (nodeId?: string) => {
    const json = this.graph.toJSON();
    const treeData = cells2Tree(
      json.cells.filter((cell) => cell.shape !== MindMapEdgeConfig.EDGE_NAME),
    );
    if (!treeData) return;

    const { layout, createEdgeConfig } =
      Object.values(layouts).find(({ name }) => name === this.layoutType) || {};

    const result = layout?.(treeData, this.layoutOptions);

    if (!result) return;

    const cells: Cell[] = [];
    const nodes: Node.Properties[] = [];
    const edges: Edge.Properties[] = [];
    const traverse = (hierarchyItem: MindMapResult) => {
      if (hierarchyItem) {
        const { data, children } = hierarchyItem;
        const nodeInfo = data.data;
        const position = {
          x: hierarchyItem.x,
          y: hierarchyItem.y,
        };
        const nodeConfig: Node.Properties = {
          ...nodeInfo,
          position,
        };
        nodes.push(nodeConfig);
        if (children) {
          children.forEach((child) => {
            const edgeLayoutConfig = createEdgeConfig?.(hierarchyItem, child);
            const edgeConfig: Edge.Properties = {
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
            };
            edges.push(edgeConfig);
            const edge = this.graph.createEdge(edgeConfig);
            cells.push(edge);
            traverse(child);
          });
        }
      }
    };
    traverse(result);
    this.diffLayout(nodes, edges);

    if (nodeId) {
      this.graph.cleanSelection();
      this.graph.select(nodeId);
      const node = this.graph.getCellById(nodeId);
      if (node?.isNode()) {
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
    } else {
      this.graph.cleanSelection();
    }
    this.emit('layout');
  };
  diffLayout = (nodes: Node.Properties[], edges: Edge.Properties[]) => {
    nodes.forEach((node) => {
      if (!node.id || !node.position) return;
      const originNode = this.graph.getCellById(node.id) as Node;

      if (originNode) {
        // 位置对比，更新布局
        const oldPosition = originNode.getPosition();
        const newPosition = node.position;
        if (
          oldPosition.x !== newPosition.x ||
          oldPosition.y !== newPosition.y ||
          !!originNode.visible === !!node.visible
        ) {
          console.log('originNode: ', originNode.attrs?.label?.text);

          originNode.setPosition(newPosition);

          // 重新连线
          const targetEdge = this.graph
            .getIncomingEdges(originNode)
            ?.filter((e) => e.shape === MindMapEdgeConfig.EDGE_NAME)[0];
          const newEdge = edges.find((edge) => {
            return edge.target?.cell === originNode.id;
          });
          if (newEdge) {
            if (targetEdge) {
              console.log('targetEdge: ', targetEdge);
              setTimeout(() => {
                targetEdge.setProp(newEdge);
              }, 1000);
            } else {
              this.graph.addEdge(newEdge);
            }
          }
        }
      }
    });
  };
  /** 设置布局方式 */
  setLayout = (type: string) => {
    this.layoutType = type;
    this.layoutOptions =
      Object.values(layouts).find((item) => item.name === type)?.layoutOptions ||
      this.layoutOptions;
    this.layout();
    const root = this.graph.getRootNodes().find((item) => item.shape === RootNodeConfig.NODE_NAME);
    if (root) {
      this.graph.cleanSelection();
      this.graph.select(root);
    }
    this.graph.centerContent();
  };
  getLayoutType() {
    return this.layoutType;
  }
  getLayoutOptions() {
    return this.layoutOptions;
  }
  setLayoutOptions(options: Partial<layouts.LayoutOptions>) {
    this.layoutOptions = {
      ...this.layoutOptions,
      ...options,
    };
    this.layout();
  }

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

  /** 为节点添加标签 */
  addTag = (node: Node, tagItem: TagDataItem) => {
    if (!node) return;
    const nodeData = node.data || {};
    const tags: Tags = cloneDeep(nodeData.tags) || [];
    if (tags.find((tag) => tag.value === tagItem.value)) return;
    tags.push(tagItem);
    console.log('tags: ', tags);
    node.setData({ tags });
  };
  /** 更新节点标签 */
  updateTag = (node: Node, oldValue: string, tagItem: TagDataItem) => {
    if (!node) return;
    const nodeData = node.data || {};
    let tags: Tags = cloneDeep(nodeData.tags) || [];
    tags = tags.map((tag) => {
      if (tag.value === oldValue) {
        return {
          ...tagItem,
        };
      }
      return tag;
    });
    node.setData(
      { ...nodeData, tags },
      {
        deep: false,
      },
    );
  };
  /** 为节点删除标签 */
  removeTag(node: Node<Node.Properties>, value: string) {
    const nodeData = node.data || {};
    const tags: Tags = cloneDeep(nodeData.tags) || [];
    node.setData(
      {
        ...nodeData,
        tags: tags.filter((tag) => tag.value !== value),
      },
      {
        deep: false,
      },
    );
  }

  /** 更新备注信息 */
  updateRemark(node: Node, remark: Remark) {
    const nodeData = node.data || {};
    node.setData(
      {
        ...nodeData,
        remark,
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
          box: {
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
    this.emit('theme:change', theme);
  }

  /** 定位到中心 */
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

  /** 粘贴 */
  paste() {
    const graph = this.graph;
    const { firstSelectedNode } = this.selectedHelper();

    const clipboardCells = graph.getCellsInClipboard();
    const clipboardNodes = clipboardCells.filter((c): c is DeepCloneNode => c.isNode());
    const currentNode = firstSelectedNode;
    if (!currentNode) return;

    // 只取父节点
    const nodes = clipboardNodes.filter((n) => {
      if (clipboardNodes.find((c: any) => c._children?.map((cc: Node) => cc.id).includes(n.id))) {
        return false;
      }
      return true;
    });
    nodes.forEach((node) => {
      currentNode.addChild(node);
    });
    graph.model.addCells(clipboardCells);
    this.layout(currentNode.id);
  }
  /** 复制 */
  copy() {
    const graph = this.graph;
    const { selectedCells, firstSelectedNode } = this.selectedHelper();
    if (!firstSelectedNode) return;
    graph.copy(selectedCells, { deep: true });
  }
  /** 剪切 */
  cut() {
    const graph = this.graph;
    const { selectedCells, firstSelectedNode } = this.selectedHelper();
    if (!firstSelectedNode) return;
    graph.cut(selectedCells, { deep: true });
  }

  selectedHelper() {
    const graph = this.graph;
    const selectedCells = graph.getSelectedCells();
    const selectedNodes = selectedCells.filter((c) => c.isNode()) as Node[];
    const firstSelectedNode = selectedNodes[0];
    return {
      selectedCells,
      selectedNodes,
      firstSelectedNode,
    };
  }

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

  getTheme() {
    return this.theme;
  }

  setTitle = (title: string) => {
    this.title = title;
  };
  getTitle = () => {
    return this.title;
  };

  fromJSON = (value: EditorJsonForm) => {
    this.graph.fromJSON(value.data);
    this.graph.drawBackground({
      color: value.page.background.color,
    });
    this.theme =
      Object.values(mindMapTheme).find((theme) => theme.id === value.theme) || this.theme;
    this.layoutType = value.layout || this.layoutType;
    this.layoutOptions = value.layoutOptions || this.layoutOptions;
  };
}
