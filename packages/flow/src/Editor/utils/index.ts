import type { Node, Cell, Graph } from '@antv/x6';
import { GroupNodeConfig } from '../nodes';

/** 获取与node节点连接的边 */
export function getNodeConnectEdges(graph: Graph, node: Node | string) {
  const id = typeof node === 'string' ? node : node.id;
  return graph.getEdges().filter((edge) => {
    return edge.getSourceCellId() === id || edge.getTargetCellId() === id;
  });
}

/** 在多个图形可以成组时计算组节点的宽高和位置 */
export function getCellsGroupMetadata(cells: Cell[]) {
  const pos = { x: 0, y: 0 };
  const posMax = { x: 0, y: 0 };

  cells.forEach((child) => {
    const bbox = child.getBBox().inflate(20);
    const corner = bbox.getCorner();

    if (bbox.x < pos.x || pos.x === 0) {
      pos.x = bbox.x;
    }

    if (bbox.y < pos.y || pos.y === 0) {
      pos.y = bbox.y;
    }

    if (corner.x > posMax.x) {
      posMax.x = corner.x;
    }

    if (corner.y > posMax.y) {
      posMax.y = corner.y;
    }
  });
  return {
    position: pos,
    size: { width: posMax.x - pos.x, height: posMax.y - pos.y },
  };
}

/** 创建群组 */
export function createGroup(graph: Graph, cells: Cell[]) {
  const { position, size } = getCellsGroupMetadata(cells);
  const groupNode = graph.createNode({
    shape: GroupNodeConfig.NODE_NAME,
    ...position,
    ...size,
  });
  graph.addNode(groupNode);
  cells.forEach((cell) => {
    groupNode.addChild(cell);
    if (cell.isNode()) {
      getNodeConnectEdges(graph, cell).forEach((edge) => {
        groupNode.addChild(edge);
      });
    }
  });
  return groupNode;
}

/** 取消组合 */
export function cancelGroup(graph: Graph, cells: Cell[]) {
  cells.forEach((child) => {
    const parentNode = child.getParent();
    parentNode?.getChildren()?.forEach((c) => {
      parentNode.removeChild(c);
      c.addTo(graph);
    });
    parentNode?.remove();
  });
}
