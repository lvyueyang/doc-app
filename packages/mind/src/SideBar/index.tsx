import {
  ChartGraph,
  EmotionHappy,
  Platte,
  SettingConfig,
  TagOne,
  TextMessage,
} from '@icon-park/react';
import type { TypeValue } from '@kangmi/types';
import { cls } from '@kangmi/utils';
import { useState } from 'react';
import { OperateItem } from '../Header';
import { IconSetting, LayoutSetting, StyleEditor, ThemeSetting } from './components';
import styles from './index.module.less';

const OPERATES = {
  STYLE: {
    key: 'style',
    title: '样式',
    icon: <SettingConfig />,
    content: <StyleEditor />,
  },
  LAYOUT: {
    key: 'layout',
    title: '结构布局',
    icon: <ChartGraph />,
    content: <LayoutSetting />,
  },
  THEME: {
    key: 'theme',
    title: '主题',
    icon: <Platte />,
    content: <ThemeSetting />,
  },
  ICON: {
    key: 'icon',
    title: '图标',
    icon: <EmotionHappy />,
    content: <IconSetting />,
  },
  TAG: {
    key: 'tag',
    title: '标签',
    icon: <TagOne />,
    content: <StyleEditor />,
  },
  REMARK: {
    key: 'remark',
    title: '备注',
    icon: <TextMessage />,
    content: <StyleEditor />,
  },
} as const;

type OPERATES_ITEM = TypeValue<typeof OPERATES>;

export default function SideBar() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState<OPERATES_ITEM | undefined>(OPERATES.ICON);

  return (
    <div className={cls([styles.sideBarContainer, visible ? '' : styles.hide])}>
      <div className={styles.operateList}>
        {Object.values(OPERATES).map((item) => {
          return (
            <OperateItem
              title={item.title}
              key={item.key}
              className={cls([
                styles.operateItem,
                active?.key === item.key && styles.operateItemActive,
              ])}
              placement="left"
              onClick={() => {
                if (item.key === active?.key) {
                  setActive(void 0);
                  setVisible(false);
                } else {
                  setActive(item);
                  setVisible(true);
                }
              }}
            >
              {item.icon}
            </OperateItem>
          );
        })}
      </div>
      <div className={styles.settingContainer}>{active?.content}</div>
    </div>
  );
}
