import { EventEmitter } from 'events';
import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { History } from '@antv/x6-plugin-history';
import { Scroller } from '@antv/x6-plugin-scroller';
import { Selection } from '@antv/x6-plugin-selection';
import { Export } from '@antv/x6-plugin-export';
import * as graphEvents from './events';

import styles from './index.module.less';

import '../nodes/register';
import './ports/register';
import './tools/register';

export interface BaseEditorOptions {
  container: HTMLElement;
  /** cover 是做组件缩略图渲染用的 */
  mode?: 'normal' | 'cover';
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
    const { container } = this.options;
    const graph = new Graph({
      container,
      background: { color: '#fff' },
      autoResize: true,
      // mousewheel: {},
      grid: {
        visible: true,
        type: 'doubleMesh',
      },
      connecting: {
        snap: true,
        allowBlank: true,
        router: {
          name: 'manhattan',
          args: {
            // step: 10,
            // padding: 100,
          },
        },
      },
      interacting: {
        edgeLabelMovable: true,
      },
    });

    return graph;
  }

  /** 加载插件 */
  private __initPlugin() {
    this.__useExport();

    if (this.options.mode !== 'cover') {
      this.__useSnapline();
      this.__useTransform();
      this.__useClipboard();
      this.__useKeyboard();
      this.__useHistory();
      this.__useScroller();
      this.__useSelection();

      this.__useEvents();
    }
  }

  /** 对齐线功能 */
  private __useSnapline() {
    this.graph.use(new Snapline({ enabled: true }));
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
        movable: true,
        showNodeSelectionBox: true,
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
    console.log('__useEvents: ');
    Object.values(graphEvents).forEach((eventFn) => {
      eventFn(this.graph);
    });
  }
}
