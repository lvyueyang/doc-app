import { Graph } from '@antv/x6';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Export } from '@antv/x6-plugin-export';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Scroller } from '@antv/x6-plugin-scroller';
import { Selection } from '@antv/x6-plugin-selection';
import { Transform } from '@antv/x6-plugin-transform';
import { EventEmitter } from 'events';
import * as graphEvents from './events';
import { RootNodeConfig } from './nodes';

import styles from './index.module.less';

import './connector/register';
import './edges/register';
import './nodes/register';
import './tools/register';

export interface BaseEditorOptions {
  container: HTMLElement;
  mode?: 'normal';
  height?: number;
  width?: number;
}
export class BaseEditor extends EventEmitter {
  options: BaseEditorOptions;
  graph: Graph;
  constructor(opt: BaseEditorOptions) {
    super();
    this.__validateOptions(opt);
    this.options = this.__defaultOptions(opt);
    this.graph = this.__init();

    // 添加插件功能
    this.__initPlugin();
  }
  private __defaultOptions(opt: BaseEditorOptions) {
    return {
      ...opt,
    };
  }
  private __validateOptions(opt: BaseEditorOptions) {
    if (!opt.container) {
      throw new Error('container is undefined');
    }
  }

  private __init() {
    const { container, height, width } = this.options;
    const graph = new Graph({
      container,
      height,
      width,
      background: { color: '#fafafa' },
      autoResize: true,
      grid: {
        visible: false,
        size: 1,
      },
      interacting: (cellView) => {
        const options = {
          nodeMovable: cellView.cell.shape === RootNodeConfig.NODE_NAME,
          edgeLabelMovable: false,
          edgeMovable: false,
          arrowheadMovable: false,
          vertexMovable: false,
          vertexAddable: false,
          vertexDeletable: false,
        };
        return options;
      },
      embedding: {
        enabled: true,
      },
      connecting: {
        snap: true,
        allowNode: false,
        highlight: true,
        allowLoop: false,
        anchor: 'right',
      },
    });

    return graph;
  }

  /** 加载插件 */
  private __initPlugin() {
    this.__useExport();

    // this.__useTransform();
    this.__useClipboard();
    this.__useKeyboard();
    this.__useHistory();
    this.__useScroller();
    this.__useSelection();

    this.__useEvents();
  }

  /** 图形变换 */
  private __useTransform() {
    this.graph.use(
      new Transform({
        resizing: {
          enabled: true,
          orthogonal: true,
        },
        // rotating: {
        //   enabled: true,
        // },
      }),
    );
  }
  /** 复制粘贴 */
  private __useClipboard() {
    this.graph.use(
      new Clipboard({
        enabled: true,
      }),
    );
  }
  /** 快捷键 */
  private __useKeyboard() {
    this.graph.use(
      new Keyboard({
        enabled: true,
        global: true,
      }),
    );
  }
  /** 历史记录 */
  private __useHistory() {
    this.graph.use(
      new History({
        enabled: true,
        beforeAddCommand: (event, args: any) => {
          if (event === 'cell:change:*' && args.key === 'ports') {
            // 控制连接桩变化时不计入历史记录
            return false;
          }
          if (args.key === 'tools') {
            // https://github.com/antvis/X6/issues/1879
            return false;
          }
        },
      }),
    );
  }
  /** 滚动画布 */
  private __useScroller() {
    this.graph.use(
      new Scroller({
        className: styles.scrollerPluginContainer,
        enabled: true,
        // modifiers: 'space',
        pageVisible: true,
        // pannable: true,
        graph: this.graph,
      }),
    );
  }
  /** 框选 */
  private __useSelection() {
    this.graph.use(
      new Selection({
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: false,
        showNodeSelectionBox: true,
        strict: true,
        // showEdgeSelectionBox: true,
      }),
    );
  }
  /** 导出 */
  private __useExport() {
    this.graph.use(new Export());
  }

  /** 注册相关事件 */
  private __useEvents() {
    Object.values(graphEvents).forEach((eventFn) => {
      eventFn(this.graph);
    });
  }
}
