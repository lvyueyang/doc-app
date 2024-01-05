import type { Edge, Node } from '@antv/x6';
import type { MindMapResult } from '@kangmi/types';
import { MindMapLRConnector } from '../connector';
import { MindMapEdgeConfig } from '../edges';
import * as layouts from '../layout';
import { RootNodeConfig } from '../nodes';
import { cells2Tree, shape2Theme } from '../utils';
import { BaseModule } from './BaseModule';

export class Layout extends BaseModule {
  /** 布局结构 */
  private type: string = layouts.MindMapHLayout.name;
  /** 布局配置 */
  private options: layouts.LayoutOptions = layouts.MindMapHLayout.layoutOptions;

  layout = (nodeId?: string) => {
    const result = this.layoutResult();
    if (!result) return;

    const { nodes, edges } = result;
    this.diffLayout(nodes, edges);

    if (nodeId) {
      this.graph.cleanSelection();
      this.graph.select(nodeId);
      const node = this.graph.getCellById(nodeId);
      if (node?.isNode()) {
        if (node.shape === RootNodeConfig.NODE_NAME) {
          this.editor.contentCenter();
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
          this.editor.contentCenter();
        }
        if (node.shape === RootNodeConfig.NODE_NAME) {
          this.editor.contentCenter();
        }
      }
    } else {
      this.graph.cleanSelection();
    }
    this.editor.emit('layout');
  };

  /** 对比变化布局 */
  diffLayout = (nodes: Node.Properties[], edges: Edge.Properties[]) => {
    nodes.forEach((node) => {
      if (!node.id || !node.position) return;
      const oldNode = this.graph.getCellById(node.id) as Node;
      const newNode = node;
      if (!oldNode) return;

      const oldPos = oldNode.getPosition();
      const newPos = newNode.position;
      if (!oldPos || !newPos) return;

      // 位置对比，更新布局
      if (oldPos.x !== newPos.x || oldPos.y !== newPos.y) {
        oldNode.setPosition(newPos);

        // 重新连线
        const targetEdge = this.graph
          .getIncomingEdges(oldNode)
          ?.filter((e) => e.shape === MindMapEdgeConfig.EDGE_NAME)[0];
        const newEdge = edges.find((edge) => {
          return edge.target?.cell === oldNode.id;
        });
        if (newEdge) {
          if (targetEdge) {
            targetEdge.setProp(newEdge);
          } else {
            this.graph.addEdge(newEdge);
          }
        }
      }
    });
  };

  /** 指定 node 节点更新布局 */
  nodeLayout = (ids: string[]) => {
    const result = this.layoutResult();
    if (!result) return;
    const { nodes, edges } = result;
    ids.forEach((id) => {
      const oldNode = this.graph.getCellById(id) as Node;
      const newNode = nodes.find((n) => n.id === id);

      if (oldNode && newNode) {
        const newPosition = newNode.position!;
        oldNode.setPosition(newPosition);

        // 重新连线
        const targetEdge = this.graph
          .getIncomingEdges(oldNode)
          ?.filter((e) => e.shape === MindMapEdgeConfig.EDGE_NAME)[0];
        const newEdge = edges.find((edge) => {
          return edge.target?.cell === oldNode.id;
        });

        if (newEdge) {
          if (targetEdge) {
            targetEdge.remove();
          }
          this.graph.addEdge(newEdge);
        }
      }
    });
  };

  layoutResult = () => {
    const json = this.graph.toJSON();
    const treeData = cells2Tree(
      json.cells.filter((cell) => cell.shape !== MindMapEdgeConfig.EDGE_NAME),
    );
    if (!treeData) return;

    const { layout, createEdgeConfig } =
      Object.values(layouts).find(({ name }) => name === this.type) ?? {};

    const result = layout?.(treeData, this.options);

    if (!result) return;

    // const cells: Cell[] = [];
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
                  type: this.editor.theme.getTheme().branchNodeEdge.type,
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
                  ...shape2Theme(data.type, this.editor.theme.getTheme())?.edge,
                },
              },
            };
            edges.push(edgeConfig);
            // const edge = this.graph.createEdge(edgeConfig);
            // cells.push(edge);
            traverse(child);
          });
        }
      }
    };
    traverse(result);

    return {
      nodes,
      edges,
    };
  };

  /** 设置布局方式 */
  setLayout = (type: string) => {
    this.type = type;
    this.options =
      Object.values(layouts).find((item) => item.name === type)?.layoutOptions ?? this.options;
    this.layout();
    const root = this.graph.getRootNodes().find((item) => item.shape === RootNodeConfig.NODE_NAME);
    if (root) {
      this.graph.cleanSelection();
      this.graph.select(root);
    }
    this.graph.centerContent();
  };

  getType() {
    return this.type;
  }

  getOptions() {
    return this.options;
  }

  setOptions(options: Partial<layouts.LayoutOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };
    this.layout();
  }
}
