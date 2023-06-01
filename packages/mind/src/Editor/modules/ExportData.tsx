import type { Graph } from '@antv/x6';
import { downloadJson } from '@kangmi/utils';
import type { Editor } from '../index';
import type { EditorJsonForm } from '../types';

/** 数据导出 */
export class ExportData {
  graph: Graph;
  editor;

  constructor(editor: Editor) {
    this.graph = editor.graph;
    this.editor = editor;
  }
  getFileName = () => {
    return this.editor.getTitle() || `flow-${Date.now()}`;
  };

  /** 导出 JSON 数据 */
  toJson = (): EditorJsonForm => {
    const json = this.graph.toJSON();
    return {
      data: json,
      page: {
        background: this.editor.getBackground(),
      },
      theme: this.editor.getTheme().id,
      layout: this.editor.getLayoutType(),
      layoutOptions: this.editor.getLayoutOptions(),
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
      backgroundColor: transparent ? 'transparent' : this.editor.getBackground().color,
      quality: 1,
      padding: 40,
    });
  };
  /**
   * 导出 JPEG 图片
   */
  exportJPEG = () => {
    this.graph.exportJPEG(this.getFileName(), {
      backgroundColor: this.editor.getBackground().color,
      quality: 1,
      padding: 40,
    });
  };
  /**
   * 导出 SVG 图片
   */
  exportSVG = () => {
    this.graph.exportSVG(this.getFileName());
  };
}
