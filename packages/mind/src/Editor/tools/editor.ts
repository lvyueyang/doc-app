import type { Cell, CellView, Dom, EdgeView, NodeView } from '@antv/x6';
import { FunctionExt, ToolsView } from '@antv/x6';

interface TextEditorOptions extends ToolsView.ToolItem.Options {
  event?: Dom.EventObject;
  textView: HTMLDivElement;
  attrs?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    color?: string;
    backgroundColor?: string;
    alignItems?: string;
    justifyContent?: string;
  };
  getText: (
    this: CellView,
    args: {
      cell: Cell;
      index?: number;
    },
  ) => string;
  setText: (
    this: CellView,
    args: {
      cell: Cell;
      value: string;
      index?: number;
      distance?: number;
    },
  ) => void;
}

const getNodeText: TextEditorOptions['getText'] = ({ cell }) => {
  return cell.attr('label/text');
};
const setNodeText: TextEditorOptions['setText'] = ({ cell, value }) => {
  cell.attr('label/text', value);
};

const spaceHackFn = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    e.stopPropagation();
  }
};

export class NodeTextEditor extends ToolsView.ToolItem<NodeView | EdgeView, TextEditorOptions> {
  private editor!: HTMLDivElement;
  private textView?: HTMLDivElement;
  private labelIndex = -1;
  private distance = 0.5;

  render() {
    this.createElement();
    this.updateEditor();
    this.autoFocus();
    this.delegateDocumentEvents(this.options.documentEvents!);

    return this;
  }

  createElement() {
    const classNames = [
      this.prefixClassName(`node-tool-editor`),
      this.prefixClassName('cell-tool-editor'),
    ];
    this.editor = ToolsView.createElement('div', false) as HTMLDivElement;
    this.addClass(classNames, this.editor);
    this.editor.contentEditable = 'true';
    this.container.appendChild(this.editor);
  }

  updateEditor() {
    const { graph, cell, editor, cellView, options } = this;
    const textView = options.textView;
    editor.addEventListener('keydown', spaceHackFn);

    this.textView = textView;

    const cellContainerBox = cellView.container.getBoundingClientRect();
    const textViewBox = textView?.getBoundingClientRect();

    const style = editor.style;

    let minWidth = 20;
    let minHeight = 20;

    style.display = 'flex';
    style.flexDirection = 'column';

    minWidth = textViewBox.width;
    minHeight = textViewBox.height;

    // set tool position
    const pos = graph.localToGraph(cell.getBBox());
    // 与节点的偏移量
    const offsetX = textViewBox!.x - cellContainerBox.x;
    const offsetY = textViewBox!.y - cellContainerBox.y;
    pos.x += offsetX;
    pos.y += offsetY;

    style.left = `${pos.x}px`;
    style.top = `${pos.y}px`;
    style.minWidth = `${minWidth}px`;
    style.minHeight = `${minHeight}px`;

    // set tool transform
    const scale = graph.scale();

    // set font style
    const attrs = this.options.attrs;
    if (attrs) {
      style.fontSize = `${attrs.fontSize! * scale.sx}px`;
      style.fontFamily = attrs.fontFamily!;
      style.color = attrs.color!;
      style.backgroundColor = attrs.backgroundColor!;
      style.fontWeight = attrs.fontWeight!;
      style.fontStyle = attrs.fontStyle!;
      style.textDecoration = attrs.textDecoration!;
      style.alignItems = attrs.alignItems! || 'center';
      style.justifyContent = attrs.justifyContent! || 'center';
    }

    // set init value
    const getText = this.options.getText || getNodeText;
    const text = FunctionExt.call(getText, this.cellView, {
      cell: this.cell,
      index: this.labelIndex,
    });
    editor.innerHTML = text || '文字内容';
    // 隐藏节点，防止阴影
    this.textView.style.visibility = 'hidden';

    return this;
  }

  onDocumentMouseDown(e: Dom.MouseDownEvent) {
    if (e.target !== this.editor) {
      const cell = this.cell;
      let value = this.editor.innerText.replace(/\n$/, '') || '';
      if (cell.isNode()) {
        value = this.editor.innerHTML || '';
      }
      // set value
      this.setCellText(value);

      // remove tool
      cell.removeTool('node-text-editor');
      this.undelegateDocumentEvents();
      if (this.textView) {
        this.textView.style.visibility = '';
      }
      this.editor.removeEventListener('keydown', spaceHackFn);
    }
  }

  onDblClick(e: Dom.DoubleClickEvent) {
    e.stopPropagation();
  }

  onMouseDown(e: Dom.MouseDownEvent) {
    e.stopPropagation();
  }

  autoFocus() {
    setTimeout(() => {
      this.editor.focus();
      this.selectText();
    });
  }

  selectText() {
    if (window.getSelection) {
      const range = document.createRange();
      const selection = window.getSelection()!;
      range.selectNodeContents(this.editor);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  setCellText(value: string) {
    const setText = this.options.setText || setNodeText;
    FunctionExt.call(setText, this.cellView, {
      cell: this.cell,
      value,
      index: this.labelIndex,
      distance: this.distance,
    });
  }
}

NodeTextEditor.config({
  tagName: 'div',
  isSVGElement: false,
  events: {
    dblclick: 'onDblClick',
    mousedown: 'onMouseDown',
  },
  documentEvents: {
    mousedown: 'onDocumentMouseDown',
  },
});
