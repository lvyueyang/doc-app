import { ColorSelect } from '@kangmi/components';
import type { SpaceProps } from 'antd';
import { Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import type { TagDataItem } from '../../Editor/types';

interface FormTagProps extends Omit<SpaceProps, 'onChange'> {
  value?: TagDataItem;
  onChange?: (value: TagDataItem) => void;
}
export default function FormTag({
  value = { color: '#1677ff', value: '' },
  onChange,
  ...props
}: FormTagProps) {
  const [content, setContent] = useState(value.value);
  const changeHandler = (form?: Partial<TagDataItem>) => {
    const newValue = {
      ...value,
      ...form,
    };
    if (newValue.color && newValue.value.trim()) {
      onChange?.(newValue);
    }
  };

  useEffect(() => {
    setContent(value.value);
  }, [value]);

  return (
    <Space {...props}>
      <ColorSelect
        value={value?.color}
        style={{ width: 50 }}
        onChange={(e) => {
          const newValue = { color: e };
          changeHandler(newValue);
        }}
      />
      <Input
        maxLength={16}
        placeholder="不超过 16 个字"
        style={{ flex: 1 }}
        value={content}
        onChange={(e) => {
          setContent(e.target.value.trim());
        }}
        onKeyUp={(e) => {
          if (e.code === 'Enter') {
            changeHandler({ value: content });
          }
        }}
      />
    </Space>
  );
}
