import { useMindEditor } from '../hooks';
import styles from './index.module.less';

export default function AttrBar() {
  const { editor } = useMindEditor();
  const graph = editor?.graph;

  return <div className={styles.attrBar}>AttrBar</div>;
}

function AttrItem({ label, children }: React.PropsWithChildren<{ label?: string }>) {
  return (
    <div className={styles.item}>
      {label && <label>{label}</label>}
      <>{children}</>
    </div>
  );
}

function GroupItem({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <dl className={styles.groupItem}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </dl>
  );
}
