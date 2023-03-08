import type { Graph } from '@antv/x6';

/** 链接桩相关事件 */

export function portEvents(graph: Graph) {
  graph.on('node:mouseenter', ({ cell, e }) => {
    const ports = cell.getPorts();
    ports.forEach((port) => {
      if (port.id) {
        cell.portProp(port.id, 'attrs/circle/r', 8);
      }
    });
  });
  graph.on('node:mouseleave', ({ cell }) => {
    const ports = cell.getPorts();
    ports.forEach((port) => {
      if (port.id) {
        cell.portProp(port.id!, 'attrs/circle/r', 0);
      }
    });
  });
  graph.on('node:selected', ({ node }) => {
    const ports = node.getPorts();
    ports.forEach((port) => {
      if (port.id) {
        node.portProp(port.id!, 'attrs/circle/r', 0);
      }
    });
  });
}
