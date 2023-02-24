import type { Cell, CellView, NodeView, EdgeView, Edge } from '@antv/x6';
import { Dom, FunctionExt, Point, ToolsView, Util } from '@antv/x6';

interface TextEditorOptions extends ToolsView.ToolItem.Options {
  event?: Dom.EventObject;
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
  labelAddable?: boolean;
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

export class TextEditor extends ToolsView.ToolItem<NodeView | EdgeView, TextEditorOptions> {
  private editor!: HTMLDivElement;
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
    const { cell } = this;
    const classNames = [
      this.prefixClassName(`${cell.isEdge() ? 'edge' : 'node'}-tool-editor`),
      this.prefixClassName('cell-tool-editor'),
    ];
    this.editor = ToolsView.createElement('div', false) as HTMLDivElement;
    this.addClass(classNames, this.editor);
    this.editor.contentEditable = 'true';
    this.container.appendChild(this.editor);
  }

  updateEditor() {
    const { graph, cell, editor } = this;
    const isNode = cell.isNode();
    const isEdge = cell.isEdge();
    const style = editor.style;

    // set tool position
    let pos = new Point();
    let minWidth = 20;
    let minHeight = 20;
    if (isNode) {
      style.display = 'inline-flex';
      pos = cell.getBBox().center;
      minWidth = cell.size().width - 4;
      minHeight = cell.size().height - 4;
    } else if (isEdge) {
      style.padding = '5px';
      style.textAlign = 'center';
      const e = this.options.event!;
      const target = e.target;
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
        pos = graph.clientToLocal(Point.create(e.clientX, e.clientY));
        const view = this.cellView as EdgeView;
        const d = view.path.closestPointLength(pos);
        this.distance = d;
      }
    }
    pos = graph.localToGraph(pos);
    style.left = `${pos.x}px`;
    style.top = `${pos.y}px`;
    style.minWidth = `${minWidth}px`;
    style.minHeight = `${minHeight}px`;

    // set tool transform
    const scale = graph.scale();
    style.transform = `scale(${scale.sx}, ${scale.sy}) translate(-50%, -50%)`;

    // set font style
    const attrs = this.options.attrs;
    if (attrs) {
      style.fontSize = `${attrs.fontSize}px`;
      style.fontFamily = attrs.fontFamily!;
      style.color = attrs.color!;
      style.backgroundColor = attrs.backgroundColor!;
      style.fontWeight = attrs.fontWeight!;
      style.fontStyle = attrs.fontStyle!;
      style.textDecoration = attrs.textDecoration!;
      style.alignItems = attrs.alignItems!;
      style.justifyContent = attrs.justifyContent!;
    }

    // set init value
    const getText = this.options.getText;
    let text;
    if (typeof getText === 'function') {
      text = FunctionExt.call(getText, this.cellView, {
        cell: this.cell,
        index: this.labelIndex,
      });
    }
    if (isNode) {
      editor.innerHTML = text || '';
    }
    if (isEdge) {
      editor.textContent = text || '';
    }

    // clear display value when edit status because char ghosting.
    if (isNode) {
      this.setCellText('');
    }

    return this;
  }

  onDocumentMouseDown(e: Dom.MouseDownEvent) {
    if (e.target !== this.editor) {
      const cell = this.cell;
      // const value = this.editor.innerText.replace(/\n$/, '') || '';
      const value = this.editor.innerHTML || '';
      // set value
      this.setCellText(value);
      // remove tool
      cell.removeTool(cell.isEdge() ? 'edge-text-editor' : 'node-text-editor');
      this.undelegateDocumentEvents();
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
    const setText = this.options.setText;
    if (typeof setText === 'function') {
      FunctionExt.call(setText, this.cellView, {
        cell: this.cell,
        value,
        index: this.labelIndex,
        distance: this.distance,
      });
    }
  }
}
TextEditor.config({
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

export const NodeTextEditor = TextEditor.define<TextEditorOptions>({
  getText({ cell }) {
    return cell.attr('label/text');
  },
  setText({ cell, value }) {
    cell.attr('label/text', value);
  },
});

export const EdgeTextEditor = TextEditor.define<TextEditorOptions>({
  labelAddable: true,
  attrs: {
    fontSize: 14,
    color: '#000',
  },
  getText(args) {
    const { cell, index } = args;
    if (index === -1) {
      return '';
    }
    return cell.prop(`labels/${index}/attrs/label/text`);
  },
  setText(args) {
    const { cell, value, index, distance } = args;
    const edge = cell as Edge;

    if (index === -1) {
      edge.appendLabel({
        position: {
          distance: distance!,
        },
        attrs: {
          label: {
            text: value,
            fontSize: 14,
            fill: '#000',
            fontStyle: 'normal',
            fontWeight: 'normal',
          },
          rect: {
            fill: '#fff',
          },
        },
      });
    } else {
      if (value) {
        edge.setPropByPath(`labels/${index}/attrs/label/text`, value);
      } else if (typeof index === 'number') {
        edge.removeLabelAt(index);
      }
    }
  },
});
