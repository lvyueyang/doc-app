import type { Node } from '@antv/x6';
import { Delete } from '@icon-park/react';
import { cls } from '@kangmi/utils';
import { Popover } from 'antd';
import { useEffect } from 'react';
import { useMindEditor } from '../../../../hooks';
import { iconGroup } from '../../../../icons';
import type { Icons } from '../../../types';
import styles from './index.module.less';
interface IconListProps {
  node?: Node;
  onChange?: () => void;
}

export default function IconList({ node, onChange }: IconListProps) {
  const { editor } = useMindEditor();
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
    <div
      className={styles.icons}
      style={{ fontSize, display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}
    >
      {icons
        ?.map(({ groupName, iconName }) => {
          const group = iconGroup.find((g) => g.name === groupName);
          const icon = group?.icons?.find((i) => i.name === iconName)?.icon;
          if (!icon) return null;
          return (
            <Popover
              key={iconName}
              content={
                <>
                  <div className={styles.iconPopoverContainer}>
                    {group.icons.map(({ name, icon: iconElement }) => {
                      return (
                        <span
                          className={cls([
                            styles.iconPopoverItem,
                            icons.find((i) => i.iconName === name)
                              ? styles.iconPopoverItemActive
                              : '',
                          ])}
                          key={name}
                          onClick={() => {
                            editor?.addIcon(node!, group.name, name, group.isOnly);
                          }}
                        >
                          {iconElement}
                        </span>
                      );
                    })}
                  </div>
                  <div
                    className={styles.removeBtn}
                    title="删除图标"
                    onClick={() => {
                      if (!node) return;
                      editor?.removeIcon(node, iconName);
                    }}
                  >
                    <Delete />
                  </div>
                </>
              }
              trigger={['click']}
            >
              {icon}
            </Popover>
          );
        })
        .filter((i) => !!i)}
    </div>
  );
}
