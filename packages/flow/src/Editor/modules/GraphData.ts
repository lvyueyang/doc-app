import { type Cell, type Graph } from '@antv/x6';
import { downloadJson } from '@kangmi/utils';
import pkgJson from '../../../package.json';

interface BackgroundOptions {
  color: string;
  image: string;
}

interface EditorJsonForm {
  version: string;
  data: {
    cells: Cell.Properties[];
  };
  page: {
    background: BackgroundOptions;
    grid: Graph.GridManager.Options;
  };
}

export class GraphData {
  /** 画布标题 */
  private title: string = '';

  constructor(private readonly graph: Graph) {}

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
      version: pkgJson.version,
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
