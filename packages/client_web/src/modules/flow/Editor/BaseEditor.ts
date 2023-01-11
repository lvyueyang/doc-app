import { EventEmitter } from 'events';
import { Graph } from '@antv/x6';

import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { History } from '@antv/x6-plugin-history';
import { Scroller } from '@antv/x6-plugin-scroller';
import { Selection } from '@antv/x6-plugin-selection';

import styles from './index.module.less';

import './nodes/register';

export interface BaseEditorOptions {
  container: HTMLElement;
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
      // mousewheel: {},
      grid: {
        visible: true,
        type: 'doubleMesh',
      },
      connecting: {
        snap: true,
      },
    });

    return graph;
  }

  private __initPlugin() {
    this.__useSnapline();
    this.__useTransform();
    this.__useClipboard();
    this.__useKeyboard();
    this.__useHistory();
    this.__useScroller();
    this.__useSelection();

    this.__useNodeEditor();
  }

  /** 对齐线功能 */
  private __useSnapline() {
    this.graph.use(new Snapline({ enabled: true }));
  }
  /** 图形变换 */
  private __useTransform() {
    // 对齐线
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
    this.graph.use(new Clipboard({}));
  }
  /** 快捷键 */
  private __useKeyboard() {
    this.graph.use(
      new Keyboard({
        enabled: true,
      }),
    );
  }
  /** 历史记录 */
  private __useHistory() {
    this.graph.use(
      new History({
        enabled: true,
      }),
    );
  }
  /** 滚动画布 */
  private __useScroller() {
    this.graph.use(
      new Scroller({
        enabled: true,
        modifiers: ['ctrl'],
        pageVisible: true,
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
      }),
    );
  }

  /** 节点编辑 */
  private __useNodeEditor() {
    this.graph.on('cell:dblclick', ({ cell, e }) => {
      const isNode = cell.isNode();
      const name = isNode ? 'node-editor' : 'edge-editor';
      cell.removeTool(name);
      cell.addTools({
        name,
        args: {
          event: e,
          attrs: {
            backgroundColor: '#FFF',
          },
        },
      });
    });
  }
}
