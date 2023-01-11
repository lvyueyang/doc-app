import { NODE_NAME } from '../Editor/nodes';
import { useFlowEditor } from '../hooks';
import styles from './index.module.less';

export default function Header() {
  const { editor } = useFlowEditor();

  if (!editor) return null;

  return (
    <div className={styles.header}>
      <button>撤销</button>
      <button>回退</button>
      <button
        onClick={() => {
          editor.appendNode(NODE_NAME.RECT.name);
        }}
      >
        添加节点
      </button>
    </div>
  );
}
