/** 右键菜单 */
import { CopyOutlined, ScissorOutlined } from '@ant-design/icons';
import type { Node } from '@antv/x6';
import { ContextMenu } from '@kangmi/components';
import { message } from 'antd';
import type { Editor } from '../index';
import { RootNodeConfig } from '../nodes';

let contextMenu: ContextMenu | undefined;

type DeepCloneNode = Node & { _children?: DeepCloneNode[] };

/** 右键菜单 */
export function registerContextMenu(editor: Editor) {
  const graph = editor.graph;
  graph.on('node:contextmenu', ({ e, cell }) => {
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
    const { selectedCells, firstSelectedNode } = editor.selectedHelper();
    const clipboardCells = graph.getCellsInClipboard();
    const clipboardNodes = clipboardCells.filter((c): c is DeepCloneNode => c.isNode());
    contextMenu.show({
      position,
      items: [
        {
          label: '新增子主题',
          key: 'appendChild',
          extra: 'Tab',
          onClick: () => {
            editor.appendChildNode();
          },
        },
        {
          label: '新增同级主题',
          key: 'appendNeighbor',
          extra: 'Tab',
          disabled: firstSelectedNode.shape === RootNodeConfig.NODE_NAME,
          onClick: () => {
            editor.appendNeighborNode();
          },
        },
        {
          type: 'divider',
          key: 'd0',
        },
        {
          label: '复制',
          key: 'copy',
          extra: 'Ctrl+C',
          icon: <CopyOutlined />,
          onClick: () => {
            editor.copy();
          },
        },
        {
          label: '剪切',
          key: 'cut',
          extra: 'Ctrl+X',
          icon: <ScissorOutlined />,
          onClick: () => {
            editor.cut();
          },
        },
        {
          label: '粘贴',
          key: 'paste',
          extra: 'Ctrl+V',
          disabled: !clipboardNodes.length,
          onClick: () => {
            editor.paste();
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
