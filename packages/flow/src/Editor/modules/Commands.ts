import { type Graph } from '@antv/x6';
import { type NodeConfig } from '../types';
import { type EdgeConfig } from '../edges/types';

interface AppendNodeOptions {
  /** 是否添加到画布中心 */
  center: boolean;
}

export class Commands {
  constructor(private readonly graph: Graph) {}
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
}

function appendNodeDefaultOptions(options?: AppendNodeOptions) {
  return {
    center: true,
    ...options,
  };
}
