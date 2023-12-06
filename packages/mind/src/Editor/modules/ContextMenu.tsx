import { CopyOutlined, ScissorOutlined } from '@ant-design/icons';
import { ContextMenu as ContextMenuClass } from '@kangmi/components';
import { message } from 'antd';
import type { Editor } from '../';
import { RootNodeConfig } from '../nodes';
import { BaseModule } from './BaseModule';

export class ContextMenu extends BaseModule {
  contextMenu?: ContextMenuClass;

  constructor(editor: Editor) {
    super(editor);
    this.init();
  }

  init() {
    const graph = this.graph;
    graph.on('node:contextmenu', ({ e, cell }) => {
      e.stopPropagation();

      const rootContainer = graph.container.parentElement!;
      const { offsetLeft, offsetTop } = rootContainer.parentElement!.parentElement!;
      const { left, top } = graph.getScrollbarPosition();

      if (!this.contextMenu) {
        this.contextMenu = new ContextMenuClass({
          rootContainer,
        });
      }

      if (!graph.isSelected(cell)) {
        graph.cleanSelection();
        graph.select(cell);
      }

      const position = { x: e.pageX + left - offsetLeft, y: e.pageY + top - offsetTop };
      const { selectedCells, firstSelectedNode } = this.editor.selectedHelper();
      const clipboardCells = graph.getCellsInClipboard();
      const clipboardNodes = clipboardCells.filter((c) => c.isNode());
      this.contextMenu.show({
        position,
        items: [
          {
            label: '新增子主题',
            key: 'appendChild',
            extra: 'Tab',
            onClick: () => {
              this.editor.cellUtils.appendChildNode();
            },
          },
          {
            label: '新增同级主题',
            key: 'appendNeighbor',
            extra: 'Tab',
            disabled: firstSelectedNode.shape === RootNodeConfig.NODE_NAME,
            onClick: () => {
              this.editor.cellUtils.appendNeighborNode();
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
              this.editor.command.copy();
            },
          },
          {
            label: '剪切',
            key: 'cut',
            extra: 'Ctrl+X',
            icon: <ScissorOutlined />,
            onClick: () => {
              this.editor.command.cut();
            },
          },
          {
            label: '粘贴',
            key: 'paste',
            extra: 'Ctrl+V',
            disabled: !clipboardNodes.length,
            onClick: () => {
              this.editor.command.paste();
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
          message.success(<>{label}成功</>);
          this.contextMenu?.close();
        },
      });
    });
    document.addEventListener('click', () => {
      this.contextMenu?.close();
    });
    document.addEventListener('contextmenu', () => {
      this.contextMenu?.close();
    });
  }
}
