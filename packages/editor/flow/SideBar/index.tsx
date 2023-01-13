import styles from './index.module.less';
import DATA_GROUP from './config';
import Thumbnail from './Thumbnail';

export default function SideBar() {
  return (
    <div className={styles.sideBar}>
      {DATA_GROUP.map((group) => {
        return (
          <dl key={group.groupName} className={styles.groupItem}>
            <dt>{group.groupName}</dt>
            <dd>
              {group.children.map((dd) => {
                return (
                  <div key={dd.label} className={styles.item}>
                    <Thumbnail shape={dd.config.shape} config={dd.config.option} />
                  </div>
                );
              })}
            </dd>
          </dl>
        );
      })}
    </div>
  );
}
