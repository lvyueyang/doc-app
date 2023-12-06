import type { Cell } from '@antv/x6';
import type { Editor } from '../';
import { TextEditorClassName } from '../constants';
import { BaseModule } from './BaseModule';

export class EventHandler extends BaseModule {
  constructor(editor: Editor) {
    super(editor);
    this.init();
    this.initKeyboard();
  }

  init() {
    const { graph } = this;
    // 添加子节点
    graph.bindKey(['tab'], (e) => {
      e.preventDefault();
      this.editor.cellUtils.appendChildNode();
    });
    // 添加兄弟节点
    graph.bindKey(['enter'], (e) => {
      e.preventDefault();
      this.editor.cellUtils.appendNeighborNode();
    });

    let removeNodeTimer: NodeJS.Timeout;
    graph.on('node:removed', () => {
      clearTimeout(removeNodeTimer);
      removeNodeTimer = setTimeout(() => {
        this.editor.layout.layout();
      }, 40);
    });
    graph.on('node:resized', (e) => {
      this.editor.layout.layout(e.cell.id);
    });

    this.editor.on('node:autoresize', (e) => {
      this.editor.layout.layout(e.id);
    });
  }

  initKeyboard() {
    const graph = this.graph;
    const editor = this.editor;

    // 复制
    graph.bindKey(['ctrl+c', 'cmd+c'], () => {
      editor.command.copy();
    });
    // 粘贴
    graph.bindKey(['ctrl+v', 'cmd+v'], () => {
      editor.command.paste();
    });
    // 剪切
    graph.bindKey(['ctrl+x', 'cmd+x'], () => {
      editor.command.cut();
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
        const childrenCount = parent?.getChildren()?.filter((cell) => cell.isNode()).length ?? 0;
        console.log('childrenCount: ', childrenCount);
        console.log('index: ', index);

        e.preventDefault();
        let nextSelectNode: Cell | null | undefined = null;

        // 上移 ↑
        if (code === 'ArrowUp') {
          if (index === 0) {
            nextSelectNode = parent;
          } else {
            nextSelectNode = parent?.getChildAt(index! - 1);
          }
        }
        // 下移 ↓
        if (code === 'ArrowDown') {
          if (index === childrenCount - 1) {
            nextSelectNode = firstSelectedNode.getChildAt(0);
          } else {
            nextSelectNode = parent?.getChildAt(index! + 1);
          }
        }
        // 左移 ←
        if (code === 'ArrowLeft') {
          nextSelectNode = parent;
        }
        // 右移 →
        if (code === 'ArrowRight') {
          nextSelectNode = firstSelectedNode.getChildAt(0);
        }

        if (nextSelectNode) {
          graph.cleanSelection();
          graph.select(nextSelectNode);
        }
      }
    });
    this.graphPanning();
    this.cellEditor();
  }

  graphPanning() {
    const graph = this.graph;

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

  cellEditor() {
    const graph = this.graph;

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
}
