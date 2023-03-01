import { CopyOutlined, ScissorOutlined } from '@ant-design/icons';
import { BringForward, BringToFront, SendBackward, SentToBack } from '@icon-park/react';
import type { Graph } from '@antv/x6';
import { ContextMenu } from '../../../components/ContextMenu';
import { message } from 'antd';
console.log('contextMenuEvents');

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
    contextMenu.show({
      position,
      items: [
        {
          label: '复制',
          key: 'copy',
          extra: 'Ctrl+C',
          onClick: () => {
            graph.copy(graph.getSelectedCells());
          },
        },
        {
          label: '剪切',
          key: 'cut',
          extra: 'Ctrl+X',
          onClick: () => {
            graph.cut(graph.getSelectedCells());
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
            graph.removeCells(graph.getSelectedCells());
          },
        },
        {
          type: 'divider',
          key: 'd1',
        },
        {
          label: '置于顶层',
          icon: <BringToFront theme="outline" size="16" fill="#333" />,
          key: 'toFront',
          onClick: () => {
            graph.getSelectedCells().forEach((cell) => {
              cell.toFront();
            });
          },
        },
        {
          label: '置于底层',
          key: 'toBack',
          icon: <SentToBack theme="outline" size="16" fill="#333" />,
          onClick: () => {
            graph.getSelectedCells().forEach((cell) => {
              cell.toBack();
            });
          },
        },
        {
          label: '上移一层',
          key: 'zIndexUp',
          icon: <BringForward theme="outline" size="16" fill="#333" />,
          onClick: () => {
            graph.copy(graph.getSelectedCells());
          },
        },
        {
          label: '下移一层',
          key: 'zIndexDown',
          icon: <SendBackward theme="outline" size="16" fill="#333" />,
          onClick: () => {
            graph.copy(graph.getSelectedCells());
          },
        },
        {
          type: 'divider',
          key: 'd2',
        },
        {
          label: '全选',
          key: 'selectAll',
          extra: 'Ctrl+A',
          onClick: () => {
            graph.copy(graph.getSelectedCells());
          },
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
