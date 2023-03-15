import type { Node } from '@antv/x6';
import { AlignTextBothOne } from '@icon-park/react';
import { Popover } from 'antd';
import { useEffect } from 'react';
import type { Remark } from '../../../types';
import styles from './index.module.less';

interface RemarkItemProps {
  node?: Node;
  onChange?: () => void;
}

export default function RemarkItem({ node, onChange }: RemarkItemProps) {
  const fontSize = (node?.getAttrs()?.label?.style as React.CSSProperties)?.fontSize || 24;

  const remark: Remark = node?.getData()?.remark || [];

  useEffect(() => {
    node?.on('change:data', (e) => {
      if (!!e.previous?.remark?.value !== !!e.current?.remark?.value) {
        onChange?.();
      }
    });
  }, []);
  if (!remark?.value) return null;
  return (
    <Popover content={<div dangerouslySetInnerHTML={{ __html: remark.value }} />}>
      <div className={styles.remark}>
        <AlignTextBothOne
          theme="multi-color"
          size={fontSize}
          fill={['#293354', '#fbd68b', '#293354', '#43CCF8']}
          strokeWidth={2}
        />
      </div>
    </Popover>
  );
}
