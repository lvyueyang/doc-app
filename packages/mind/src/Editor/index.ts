import type { Node } from '@antv/x6';
import type { BaseEditorOptions } from './BaseEditor';
import { BaseEditor } from './BaseEditor';
import { CellUtils } from './modules/CellUtils';
import { Command } from './modules/Command';
import { ContextMenu } from './modules/ContextMenu';
import { EventHandler } from './modules/EventHandler';
import { ExportData } from './modules/ExportData';
import { Layout } from './modules/Layout';
import type { ThemeEventTypes } from './modules/Theme';
import { Theme } from './modules/Theme';
import { RootNodeConfig } from './nodes';
import * as mindMapTheme from './theme';
import type { EditorJsonForm } from './types';

type EventTypes = {
  layout: () => void;
  'node:autoresize': (node: Node) => void;
} & ThemeEventTypes;

export class Editor extends BaseEditor<EventTypes> {
  options: BaseEditorOptions;
  readonly export = new ExportData(this);
  readonly theme = new Theme(this);
  readonly layout = new Layout(this);
  readonly cellUtils = new CellUtils(this);
  readonly command = new Command(this);

  /** 画布标题 */
  private title: string = '';

  eventHandler: EventHandler;
  contentMenu: ContextMenu;

  constructor(options: BaseEditorOptions) {
    super(options);
    this.options = options;

    this.graph.drawBackground(this.theme.getBackground());

    this.eventHandler = new EventHandler(this);
    this.contentMenu = new ContextMenu(this);
  }

  /** 定位到中心 */
  contentCenter = () => {
    const selectNode = this.graph.getSelectedCells()[0];
    if (selectNode) {
      this.graph.centerCell(selectNode);
    } else {
      const rootNode = this.graph.getRootNodes().find((r) => r.shape === RootNodeConfig.NODE_NAME);
      if (rootNode) {
        this.graph.centerCell(rootNode);
      }
    }
  };

  /** 选中工具方法 */
  selectedHelper() {
    const graph = this.graph;
    const selectedCells = graph.getSelectedCells();
    const selectedNodes = selectedCells.filter((c) => c.isNode()) as Node[];
    const firstSelectedNode = selectedNodes[0];
    return {
      selectedCells,
      selectedNodes,
      firstSelectedNode,
    };
  }

  setTitle = (title: string) => {
    this.title = title;
  };

  getTitle = () => {
    return this.title;
  };

  fromJSON = (value: EditorJsonForm) => {
    this.graph.fromJSON(value.data);
    this.graph.drawBackground({
      color: value.page.background.color,
    });
    this.theme.setTheme(Object.values(mindMapTheme).find((theme) => theme.id === value.theme));
    this.layout.setLayout(value.layout);
  };
}
