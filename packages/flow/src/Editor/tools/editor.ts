import {
  type Cell,
  type CellView,
  type EdgeView,
  type NodeView,
  Dom,
  FunctionExt,
  Point,
  ToolsView,
  Util,
} from '@antv/x6';

interface TextEditorOptions extends ToolsView.ToolItem.Options {
  event?: Dom.EventObject;
  textView: HTMLDivElement;
  labelAddable?: boolean;
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
      this.prefixClassName(`${this.cell.isEdge() ? 'edge' : 'node'}-tool-editor`),
      this.prefixClassName('cell-tool-editor'),
    ];
    this.editor = ToolsView.createElement('div', false) as HTMLDivElement;
    this.addClass(classNames, this.editor);
    this.editor.contentEditable = 'true';
    this.container.appendChild(this.editor);
  }

  updateEditor() {
    if (this.cell.isNode()) {
      this.updateNodeEditor();
    }
    if (this.cell.isEdge()) {
      this.updateEdgeEditor();
    }

    return this;
  }

  updateNodeEditor() {
    const { graph, cell, editor, cellView, options } = this;
    editor.addEventListener('keydown', spaceHackFn);
    const textView = options.textView;
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
    const offsetX = textViewBox.x - cellContainerBox.x;
    const offsetY = textViewBox.y - cellContainerBox.y;
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
  }

  updateEdgeEditor() {
    if (!this.options.event) {
      return;
    }

    const { graph, editor } = this;
    if (!editor) {
      return;
    }

    let pos = Point.create();
    let minWidth = 20;
    const { style } = editor;
    const target = this.options.event.target;
    const parent = target.parentElement;
    const isEdgeLabel = parent && Dom.hasClass(parent, this.prefixClassName('edge-label'));
    if (isEdgeLabel) {
      const index = parent.getAttribute('data-index') || '0';
      this.labelIndex = parseInt(index, 10);
      const matrix = parent.getAttribute('transform');
      const { translation } = Dom.parseTransformString(matrix);
      pos = new Point(translation.tx, translation.ty);
      minWidth = Util.getBBox(target).width;
    } else {
      if (!this.options.labelAddable) {
        return this;
      }
      pos = graph.clientToLocal(
        Point.create(this.options.event.clientX, this.options.event.clientY),
      );
      const view = this.cellView as EdgeView;
      const d = view.path.closestPointLength(pos);
      this.distance = d;
      this.labelIndex = -1;
    }

    pos = graph.localToGraph(pos);
    const scale = graph.scale();
    style.left = `${pos.x}px`;
    style.top = `${pos.y}px`;
    style.minWidth = `${minWidth}px`;
    style.transform = `scale(${scale.sx}, ${scale.sy}) translate(-50%, -50%)`;
    style.background = '#fff';
    style.fontSize = '14px';

    const text = this.getCellText();

    editor.innerHTML = text || '';
  }

  onDocumentMouseDown(e: Dom.MouseDownEvent) {
    if (e.target !== this.editor) {
      const cell = this.cell;
      let value = this.editor.innerText.replace(/\n$/, '') || '';
      if (cell.isNode()) {
        value = this.editor.innerHTML || '';
      }
      if (cell.isEdge()) {
        value = this.editor.innerHTML || '';
      }
      // set value
      this.setCellText(value);

      // remove tool
      cell.removeTool(`${cell.isNode() ? 'node' : 'edge'}-text-editor`);
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

  getCellText() {
    const getText = this.options.getText || getNodeText;

    if (this.cell.isNode()) {
      return FunctionExt.call(getText, this.cellView, {
        cell: this.cell,
        index: this.labelIndex,
      });
    }
    if (this.cell.isEdge()) {
      if (this.labelIndex !== -1) {
        return this.cell.prop(`labels/${this.labelIndex}/attrs/label/text`);
      }
    }
  }

  setCellText(value: string) {
    const setText = this.options.setText;
    console.log('setText: ', this.options.setText);
    if (typeof setText === 'function' || this.cell.isNode()) {
      FunctionExt.call(setText || setNodeText, this.cellView, {
        cell: this.cell,
        value,
        index: this.labelIndex,
        distance: this.distance,
      });
    } else if (this.cell.isEdge()) {
      const edge = this.cell;
      if (this.labelIndex === -1) {
        if (value) {
          const newLabel = {
            position: {
              distance: this.distance,
            },
            attrs: {},
          };
          edge.appendLabel(newLabel);
        }
      } else {
        if (value !== null) {
          edge.prop(`labels/${this.labelIndex}/attrs/label/text`, value);
        } else if (typeof this.labelIndex === 'number') {
          edge.removeLabelAt(this.labelIndex);
        }
      }
    }
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
