import React from 'react';
import styles from './index.module.less';

export function SettingBarAttrItem({
  label,
  children,
}: React.PropsWithChildren<{ label?: string }>) {
  return (
    <div className={styles.item}>
      {label && <label>{label}</label>}
      <>{children}</>
    </div>
  );
}

export function SettingBarGroupItem({
  label,
  children,
}: React.PropsWithChildren<{ label: string }>) {
  return (
    <dl className={styles.groupItem}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </dl>
  );
}
