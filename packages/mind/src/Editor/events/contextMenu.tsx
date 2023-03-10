import type { Graph, Node } from '@antv/x6';
import { ContextMenu } from '@kangmi/components';
import { message } from 'antd';

let contextMenu: ContextMenu | undefined;

/** 右键菜单 */
export function contextMenuEvents(graph: Graph) {
  graph.on('cell:contextmenu', ({ e, cell, x, y }) => {
    e.stopPropagation();

    const rootContainer = graph.container.parentElement!;
    const { offsetLeft, offsetTop } = rootContainer.parentElement!.parentElement!;
    const { left, top } = graph.getScrollbarPosition();

    if (!contextMenu) {
      contextMenu = new ContextMenu({
        rootContainer,
      });
    }

    if (!graph.isSelected(cell)) {
      graph.cleanSelection();
      graph.select(cell);
    }

    const position = { x: e.pageX + left - offsetLeft, y: e.pageY + top - offsetTop };
    const selectedCells = graph.getSelectedCells();
    const selectedNodes = selectedCells.filter((c) => c.isNode()) as Node[];
    contextMenu.show({
      position,
      items: [
        {
          label: '复制',
          key: 'copy',
          extra: 'Ctrl+C',
          onClick: () => {
            graph.copy(selectedCells);
          },
        },
        {
          label: '剪切',
          key: 'cut',
          extra: 'Ctrl+X',
          onClick: () => {
            graph.cut(selectedCells);
          },
        },
        {
          label: '粘贴',
          key: 'paste',
          extra: 'Ctrl+V',
          onClick: () => {
            graph.paste();
          },
        },
        {
          label: '删除',
          key: 'delete',
          extra: 'Delete/Backspace',
          onClick: () => {
            graph.removeCells(selectedCells);
          },
        },
        {
          type: 'divider',
          key: 'd1',
        },
      ],
      onClick: ({ label }) => {
        message.success(label + '成功');
        contextMenu?.close();
      },
    });
  });
  document.addEventListener('click', (e) => {
    contextMenu?.close();
  });
  document.addEventListener('contextmenu', (e) => {
    contextMenu?.close();
  });
}
