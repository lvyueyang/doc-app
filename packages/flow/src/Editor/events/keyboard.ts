import type { Graph } from '@antv/x6';

/** 双击添加文本 */
export function keyboardEvents(graph: Graph) {
  // 复制
  graph.bindKey(['ctrl+c', 'cmd+c'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
  // 粘贴
  graph.bindKey(['ctrl+v', 'cmd+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });
  // 撤销
  graph.bindKey(['ctrl+z', 'cmd+z'], () => {
    graph.undo();
  });
  // 重做
  graph.bindKey(['ctrl+shift+z', 'cmd+shift+z'], () => {
    graph.redo();
  });
  // 删除
  graph.bindKey(['delete', 'backspace'], () => {
    const selectedCells = graph.getSelectedCells();
    graph.removeCells(selectedCells);
  });
  // 全选
  graph.bindKey(['ctrl+A', 'cmd+A'], (e) => {
    e.preventDefault();
    graph.select(graph.getCells());
  });
}

/** 按下空格键开启平移，滚轮缩放 */
export function graphPanning(graph: Graph) {
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.keyCode === 32) {
      e.preventDefault();
      if (!graph.isPannable()) {
        graph.enablePanning();
        graph.disableSelection(); // 暂时关闭选中
        graph.container.style.cursor = 'grab';
      }
      if (!graph.isMouseWheelEnabled()) {
        graph.enableMouseWheel(); // 开启滚轮缩放
        graph.lockScroller();
      }
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
      graph.unlockScroller(); // 开启滚动
      graph.enableSelection(); // 开启选中
      graph.disablePanning(); // 关闭拖动平移
      graph.disableMouseWheel(); // 关闭滚轮缩放
      graph.container.style.cursor = 'auto'; // 鼠标手型关闭
    }
  });
}
