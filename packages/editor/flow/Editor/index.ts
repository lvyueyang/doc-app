import type { BaseEditorOptions } from './BaseEditor';
import { BaseEditor } from './BaseEditor';
import type { NodeConfig } from './nodes';

interface AppendNodeOptions {
  /** 是否添加到画布中心 */
  center: boolean;
}

interface EditorOptions {
  container: BaseEditorOptions['container'];
}

export class Editor extends BaseEditor {
  constructor(opt: EditorOptions) {
    super({ container: opt.container });
  }

  /** 添加节点 */
  appendNode(shape: string, config?: NodeConfig, options?: AppendNodeOptions) {
    const nodeConfig: NodeConfig = {
      ...config,
    };
    const opt = appendNodeDefaultOptions(options);
    if (opt?.center) {
      const {
        center: { x, y },
      } = this.graph.getGraphArea();
      nodeConfig.x = x;
      nodeConfig.y = y;
    }
    return this.graph.addNode({
      shape,
      ...nodeConfig,
    });
  }
}

function appendNodeDefaultOptions(options?: AppendNodeOptions) {
  return {
    center: true,
    ...options,
  };
}
