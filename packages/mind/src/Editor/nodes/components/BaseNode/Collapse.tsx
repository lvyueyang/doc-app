import type { Node } from '@antv/x6';
import { useMindEditor } from '../../../../hooks';
import { MindMapEdgeConfig } from '../../../edges';
import { shape2Theme } from '../../../utils';
import { ChildNodeConfig, RootNodeConfig } from '../../index';
import styles from './index.module.less';

interface CollapseProps {
  node: Node;
  onChange?: () => void;
}

export default function Collapse({ node, onChange }: CollapseProps) {
  const { editor } = useMindEditor();
  const children = node.getDescendants().filter((cell) => cell.isNode());
  const firstChild = node.getChildren()?.filter((i) => i.shape === ChildNodeConfig.NODE_NAME)?.[0];
  const isCollapse = !firstChild?.isVisible();

  const toggleHandler = () => {
    const first = firstChild;
    if (first) {
      const visible = first.isVisible();
      console.log('visible: ', visible);
      const children = node.getDescendants();
      for (const child of children) {
        // TODO 用于解决折叠后的数据被展开连线位置错误问题
        if (child.isNode()) {
          child.setAttrs({
            // box: {
            //   visible: !visible,
            // },
          });
        }
        child.visible = !visible;
      }
      onChange?.();
    }
  };

  if (!editor || node.shape === RootNodeConfig.NODE_NAME || !firstChild) return null;
  // 边主题
  const { edge } = shape2Theme(node.shape, editor.theme.getTheme());

  // 获取要展示的定位的位置
  const getPosName = (): string | null => {
    const sources = editor.graph
      .getOutgoingEdges(node)
      ?.filter((e) => e.shape === MindMapEdgeConfig.EDGE_NAME);
    if (!sources?.length) return null;
    const source = sources[0];
    return (source.getSource() as any).anchor.name;
  };
  const posName = getPosName();
  if (!posName) return null;

  return (
    <div
      className={styles.collapse}
      onClick={() => {
        toggleHandler();
      }}
      style={{
        background: editor?.theme.getTheme().background.color,
        borderColor: edge.stroke,
        color: edge.stroke,
        [posName]: -24,
        ...(isCollapse && { opacity: 1 }),
      }}
    >
      {isCollapse && <span>{children.length}</span>}
    </div>
  );
}
