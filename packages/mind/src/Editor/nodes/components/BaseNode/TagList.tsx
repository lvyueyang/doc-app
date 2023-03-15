import type { Node } from '@antv/x6';
import { Popover, Tag } from 'antd';
import { useEffect } from 'react';
import FormTag from '../../../../components/FormTag';
import { useMindEditor } from '../../../../hooks';
import type { Tags } from '../../../types';
import styles from './index.module.less';

interface TagListProps {
  node?: Node;
  onChange?: () => void;
}

export default function TagList({ node, onChange }: TagListProps) {
  const { editor } = useMindEditor();

  const tags: Tags = node?.getData()?.tags || [];

  useEffect(() => {
    node?.on('change:data', (e) => {
      if (JSON.stringify(e.previous?.tags || []) !== JSON.stringify(e.current?.tags || [])) {
        onChange?.();
      }
    });
  }, []);
  if (!tags?.length) return null;
  return (
    <div className={styles.tags}>
      {tags
        ?.map(({ color, value }) => {
          return (
            <Popover
              trigger={['click']}
              key={value}
              content={
                <FormTag
                  value={{ color, value }}
                  onChange={(newValue) => {
                    editor?.updateTag(node, value, newValue);
                  }}
                />
              }
            >
              <Tag color={color} className={styles.tagItem}>
                {value}
              </Tag>
            </Popover>
          );
        })
        .filter((i) => !!i)}
    </div>
  );
}
