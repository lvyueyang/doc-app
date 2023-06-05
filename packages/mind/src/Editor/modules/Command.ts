import type { Node } from '@antv/x6';
import { BaseModule } from './BaseModule';

export class Command extends BaseModule {
  /** 粘贴 */
  paste() {
    const graph = this.graph;
    const { firstSelectedNode } = this.editor.selectedHelper();

    const clipboardCells = graph.getCellsInClipboard();
    const clipboardNodes = clipboardCells.filter((c) => c.isNode());
    const currentNode = firstSelectedNode;
    if (!currentNode) return;

    // 只取父节点
    const nodes = clipboardNodes.filter((n) => {
      if (clipboardNodes.find((c: any) => c._children?.map((cc: Node) => cc.id).includes(n.id))) {
        return false;
      }
      return true;
    });
    nodes.forEach((node) => {
      currentNode.addChild(node);
    });
    graph.model.addCells(clipboardCells);
    this.editor.layout.layout(currentNode.id);
  }
  /** 复制 */
  copy() {
    const graph = this.graph;
    const { selectedCells, firstSelectedNode } = this.editor.selectedHelper();
    if (!firstSelectedNode) return;
    graph.copy(selectedCells, { deep: true });
  }
  /** 剪切 */
  cut() {
    const graph = this.graph;
    const { selectedCells, firstSelectedNode } = this.editor.selectedHelper();
    if (!firstSelectedNode) return;
    graph.cut(selectedCells, { deep: true });
  }
}
