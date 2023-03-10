import {
  ChartGraph,
  EmotionHappy,
  Platte,
  SettingConfig,
  TagOne,
  TextMessage,
} from '@icon-park/react';
import { OperateItem } from '../Header';
import { useMindEditor } from '../hooks';
import styles from './index.module.less';

export default function SideBar() {
  const { editor } = useMindEditor();
  const graph = editor?.graph;

  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.operateList}>
        <OperateItem title="样式" className={styles.operateItem}>
          <SettingConfig />
        </OperateItem>
        <OperateItem title="结构" className={styles.operateItem}>
          <ChartGraph />
        </OperateItem>
        <OperateItem title="主题" className={styles.operateItem}>
          <Platte />
        </OperateItem>
        <OperateItem title="图标" className={styles.operateItem}>
          <EmotionHappy />
        </OperateItem>
        <OperateItem title="标签" className={styles.operateItem}>
          <TagOne />
        </OperateItem>
        <OperateItem title="备注" className={styles.operateItem}>
          <TextMessage />
        </OperateItem>
      </div>
      {/* <div className={styles.settingContainer}>settingContainer</div> */}
    </div>
  );
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
