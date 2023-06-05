import type { Graph } from '@antv/x6';
import type { Editor } from '../';

export class BaseModule {
  graph: Graph;
  editor;

  constructor(editor: Editor) {
    this.graph = editor.graph;
    this.editor = editor;
  }
}
