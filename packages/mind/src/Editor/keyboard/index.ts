/**
 * 键盘鼠标事件
 */
import type { Graph } from '@antv/x6';
import { TextEditorClassName } from '../constants';
import type { Editor } from '../index';

export function registerKeyboard(editor: Editor) {
  const graph = editor.graph;

  // 复制
  graph.bindKey(['ctrl+c', 'cmd+c'], () => {
    editor.copy();
  });
  // 粘贴
  graph.bindKey(['ctrl+v', 'cmd+v'], () => {
    editor.paste();
  });
  // 剪切
  graph.bindKey(['ctrl+x', 'cmd+x'], () => {
    editor.cut();
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

  // 方向键选择节点
  document.addEventListener('keydown', (e) => {
    const code = e.code;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
      const { firstSelectedNode } = editor.selectedHelper();
      if (!firstSelectedNode) {
        return;
      }
      console.log('firstSelectedNode: ', firstSelectedNode);
      const parent = firstSelectedNode.getParent();
      console.log('parent: ', parent);
      const index = parent?.getChildIndex(firstSelectedNode);
      console.log('index: ', index);

      e.preventDefault();
      // 上移 ↑
      if (code === 'ArrowUp') {
        if (index === 0) {
          graph.select(parent!);
        }
      }
      // // 下移 ↓
      // if (code === 'ArrowDown') {
      // }
      // // 左移 ←
      // if (code === 'ArrowLeft') {
      // }
      // // 右移 →
      // if (code === 'ArrowRight') {
      // }
    }
  });

  graphPanning(graph);
  cellEditor(graph);
}

/** 按下空格键开启平移，滚轮缩放 */
function graphPanning(graph: Graph) {
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

/** 文本编辑 */
function cellEditor(graph: Graph) {
  graph.on('edge:dblclick', ({ cell, e }) => {
    const name = 'edge-editor';
    cell.removeTool(name);
    cell.addTools({
      name,
      args: {
        event: e,
        attrs: {
          backgroundColor: '#FFF',
        },
      },
    });
  });
  graph.on('node:dblclick', ({ cell, node, view, e }) => {
    const name = 'node-text-editor';
    cell.removeTool(name);

    const editorContainer = view.container.querySelector(`.${TextEditorClassName}`);
    if (!editorContainer) return;
    const style = (node.getAttrs().label?.style as React.CSSProperties) || {};

    cell.addTools({
      name,
      args: {
        event: e,
        textView: editorContainer,
        attrs: {
          ...style,
        },
      },
    });
  });
}
