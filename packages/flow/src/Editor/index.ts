import type { Cell, Graph } from '@antv/x6';
import { downloadJson } from '@kangmi/utils';
import type { BaseEditorOptions } from './BaseEditor';
import { BaseEditor } from './BaseEditor';
import type { EdgeConfig } from './edges/types';
import type { NodeConfig } from './types';

interface BackgroundOptions {
  color: string;
  image: string;
}

interface EditorJsonForm {
  data: {
    cells: Cell.Properties[];
  };
  page: {
    background: BackgroundOptions;
    grid: Graph.GridManager.Options;
  };
}

interface AppendNodeOptions {
  /** 是否添加到画布中心 */
  center: boolean;
}

type EditorOptions = BaseEditorOptions;

export class Editor extends BaseEditor {
  options: BaseEditorOptions;

  /** 画布标题 */
  private title: string = '';

  constructor(options: EditorOptions) {
    super(options);
    this.options = options;
  }

  /** 添加节点 */
  appendNode = (shape: string, config?: NodeConfig, options?: AppendNodeOptions) => {
    const conf: NodeConfig = {
      ...config,
    };
    const opt = appendNodeDefaultOptions(options);
    if (opt?.center) {
      const {
        center: { x, y },
      } = this.graph.getGraphArea();
      conf.x = x;
      conf.y = y;
    }
    return this.graph.addNode({
      shape,
      ...conf,
    });
  };

  /** 添加边 */
  appendEdge = (shape: string, config?: EdgeConfig, options?: AppendNodeOptions) => {
    const conf: EdgeConfig = {
      ...config,
    };
    const opt = appendNodeDefaultOptions(options);
    if (opt?.center) {
      const {
        center: { x, y },
      } = this.graph.getGraphArea();
      conf.target = { x: x + 50, y: y - 50 };
      conf.source = { x: x - 50, y: y + 50 };
      conf.vertices = [
        {
          x,
          y,
        },
      ];
    }
    return this.graph.addEdge({
      shape,
      ...conf,
    });
  };

  /** 获取背景 */
  getBackground = () => {
    const dom = this.graph.container.parentElement!.querySelector('.x6-graph-scroller-background');
    const style = getComputedStyle(dom!);
    const result = {
      color: style.backgroundColor,
      image: style.backgroundImage,
    };
    return result;
  };

  setTitle = (title: string) => {
    this.title = title;
  };

  getTitle = () => {
    return this.title;
  };

  getFileName = () => {
    return this.title || `flow-${Date.now()}`;
  };

  fromJSON = (value: EditorJsonForm) => {
    this.graph.fromJSON(value.data);
    this.graph.drawGrid(value.page.grid);
    this.graph.drawBackground({
      color: value.page.background.color,
    });
  };

  /** 导出 JSON 数据 */
  toJson = (): EditorJsonForm => {
    const json = this.graph.toJSON();
    return {
      data: json,
      page: {
        background: this.getBackground(),
        grid: this.graph.options.grid,
      },
    };
  };

  /**
   * 导出 JSON 文件
   */
  exportJSON = () => {
    const json = this.toJson();
    const str = JSON.stringify(json);
    downloadJson(str, this.getFileName());
  };

  /**
   * 导出 PNG 图片
   * @param transparent 是否为透明背景 默认 false
   */
  exportPNG = (transparent: boolean = false) => {
    this.graph.exportPNG(this.getFileName(), {
      backgroundColor: transparent ? 'transparent' : this.getBackground().color,
      quality: 1,
      padding: 10,
    });
  };

  /**
   * 导出 JPEG 图片
   */
  exportJPEG = () => {
    this.graph.exportJPEG(this.getFileName(), {
      backgroundColor: this.getBackground().color,
      quality: 1,
      padding: 10,
    });
  };

  /**
   * 导出 SVG 图片
   */
  exportSVG = () => {
    this.graph.exportSVG(this.getFileName());
  };
}

function appendNodeDefaultOptions(options?: AppendNodeOptions) {
  return {
    center: true,
    ...options,
  };
}
