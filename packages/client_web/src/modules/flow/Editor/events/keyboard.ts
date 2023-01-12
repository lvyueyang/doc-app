import type { Graph } from '@antv/x6';

/** 双击添加文本 */
export function keyboardEvents(graph: Graph) {
  // 复制
  graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
  // 粘贴
  graph.bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });
  // 撤销
  graph.bindKey('ctrl+z', () => {
    graph.undo();
  });
  // 重做
  graph.bindKey('ctrl+shift+z', () => {
    graph.redo();
  });
}
