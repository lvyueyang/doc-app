import type { Node } from '@antv/x6';
import { cls } from '@kangmi/utils';
import { useRef } from 'react';
import { useMindEditor } from '../../../../hooks';
import HtmlText from '../HtmlText';
import styles from './index.module.less';

interface BaseNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  node: Node;
}

export default function BaseNode({ node, className, style }: BaseNodeProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { editor } = useMindEditor();

  const changeHandler = () => {
    const target = targetRef.current;
    if (!target) return;

    const box = target.getBoundingClientRect();

    node?.setSize({
      width: box.width + 4,
      height: box.height + 4,
    });
    editor?.emit('node:autoresize', node);
  };

  return (
    <div
      className={cls(['kangmi-node', styles.node, className])}
      ref={targetRef}
      style={{
        position: 'absolute',
        ...style,
      }}
    >
      <div className={styles.image} />
      <div className={styles.mainLine}>
        <div className={styles.icons}>
          <div />
        </div>
        <HtmlText node={node} onChange={changeHandler} />
        <div className={styles.remark}>{/* <TextMessage /> */}</div>
      </div>
      <div className={styles.tags}>
        <span />
      </div>
    </div>
  );
}
