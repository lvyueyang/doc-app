import type { Node } from '@antv/x6';
import { useEffect } from 'react';
import { iconGroup } from '../../../../icons';
import type { Icons } from '../../../types';
import styles from './index.module.less';
interface IconListProps {
  node?: Node;
  onChange?: () => void;
}

export default function IconList({ node, onChange }: IconListProps) {
  const { label } = node?.getAttrs() || {};
  const icons: Icons = node?.getData()?.icons || [];
  const { fontSize } = (label?.style as React.CSSProperties) || {};

  useEffect(() => {
    node?.on('change:data', (e) => {
      if (JSON.stringify(e.previous?.icons || []) !== JSON.stringify(e.current?.icons || [])) {
        onChange?.();
      }
    });
  }, []);
  if (!icons?.length) return null;
  return (
    <div className={styles.icons} style={{ fontSize }}>
      {icons
        ?.map(({ groupName, iconName }) => {
          const group = iconGroup.find((g) => g.name === groupName);
          return group?.icons?.find((i) => i.name === iconName)?.icon || '';
        })
        .filter((i) => !!i)}
    </div>
  );
}
