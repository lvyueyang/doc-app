import type { Cell, Node } from '@antv/x6';
import { useEffect, useState } from 'react';
import { useMindEditor } from '../../../../hooks';
import { MindMapEdgeConfig } from '../../../edges';
import { shape2Theme } from '../../../utils';
import { RootNodeConfig } from '../../index';
import styles from './index.module.less';

interface CollapseProps {
  node: Node;
  onChange?: () => void;
}

export default function Collapse({ node, onChange }: CollapseProps) {
  const { editor } = useMindEditor();
  const [isCollapse, setIsCollapse] = useState(!!node.getData().isCollapse);
  const children = node.getDescendants();

  const toggleHandler = (cell = node) => {
    cell.getDescendants().forEach((child) => {
      child.setVisible(!cell.getData()?.isCollapse);
    });
  };

  useEffect(() => {
    toggleHandler(node);
    const fn = (e: Cell.ChangeArgs<any>) => {
      if (e.previous.isCollapse !== e.current.isCollapse) {
        toggleHandler(e.cell as Node);
        setIsCollapse(e.current.isCollapse);
        onChange?.();
      }
    };
    node.on('change:data', fn);
    return () => {
      node.off('change:data', fn);
    };
  }, []);

  if (!editor || node.shape === RootNodeConfig.NODE_NAME) return null;
  const sons = node.getChildren();

  if (!sons?.length) return null;

  const { edge } = shape2Theme(node.shape, editor.theme);
  const sources = editor.graph
    .getOutgoingEdges(node)
    ?.filter((e) => e.shape === MindMapEdgeConfig.EDGE_NAME);
  if (!sources?.length) return null;
  const source = sources[0];
  const posName = (source.getSource() as any).anchor.name;

  return (
    <div
      className={styles.collapse}
      onClick={() => {
        node.setData({ isCollapse: !isCollapse }, { deep: false });
      }}
      style={{
        background: editor?.theme.background.color,
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
