import type { Graph, Node } from '@antv/x6';
import { BringForward, BringToFront, SendBackward, SentToBack } from '@icon-park/react';
import { ContextMenu } from '@kangmi/components';
import { message } from 'antd';
import { GroupNodeConfig } from '../nodes';
import { cancelGroup, createGroup } from '../utils';

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
        {
          label: '置于顶层',
          icon: <BringToFront theme="outline" size="16" fill="#333" />,
          key: 'toFront',
          onClick: () => {
            selectedCells.forEach((cell) => {
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
          label: '组合',
          key: 'group',
          disabled: selectedNodes.length <= 1,
          onClick: () => {
            const groupNode = createGroup(graph, selectedNodes);
            const minZIndex = selectedNodes[0].getZIndex() || 0;
            selectedNodes.forEach((node) => {
              console.log(node.getZIndex());
            });
            groupNode.setZIndex(minZIndex === 0 ? 0 : minZIndex - 1);
            graph.cleanSelection();
            graph.select(groupNode);
          },
        },
        {
          label: '取消组合',
          key: 'unGroup',
          disabled: !selectedCells.find((c) => {
            return c.hasParent() || c.shape === GroupNodeConfig.NODE_NAME;
          }),
          onClick: () => {
            cancelGroup(graph, selectedNodes);
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
            graph.copy(selectedCells);
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
