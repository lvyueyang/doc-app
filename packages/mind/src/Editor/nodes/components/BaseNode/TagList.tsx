import type { Node } from '@antv/x6';
import { Popover } from 'antd';
import { useEffect } from 'react';
import FormTag from '../../../../components/FormTag';
import { useMindEditor } from '../../../../hooks';
import type { Tags } from '../../../types';

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
    <div style={{ whiteSpace: 'nowrap', paddingTop: 6 }}>
      {tags
        ?.map(({ color, value }, index) => {
          return (
            <Popover
              trigger={['click']}
              key={value}
              content={
                <FormTag
                  value={{ color, value }}
                  onChange={(newValue) => {
                    editor?.updateTag(node!, value, newValue);
                  }}
                />
              }
            >
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: color,
                  color: '#fff',
                  borderRadius: 3,
                  padding: '4px 7px',
                  fontSize: 12,
                  marginRight: index === tags.length - 1 ? 0 : 8,
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                {value}
              </span>
            </Popover>
          );
        })
        .filter((i) => !!i)}
    </div>
  );
}
