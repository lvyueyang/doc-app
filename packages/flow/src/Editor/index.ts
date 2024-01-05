import type { BaseEditorOptions } from './BaseEditor';
import { BaseEditor } from './BaseEditor';
import { Commands } from './modules/Commands';
import { GraphData } from './modules/GraphData';

type EditorOptions = BaseEditorOptions;

export class Editor extends BaseEditor {
  options: BaseEditorOptions;

  commands: Commands;
  graphData: GraphData;

  constructor(options: EditorOptions) {
    super(options);
    this.options = options;

    this.commands = new Commands(this.graph);
    this.graphData = new GraphData(this.graph);
  }
}
