import type { Node } from '@antv/x6';
import { cls } from '@kangmi/utils';
import { useRef } from 'react';
import { useMindEditor } from '../../../../hooks';
import { shape2Theme } from '../../../utils';
import HtmlText from '../HtmlText';
import IconList from './IconList';
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
    window.requestAnimationFrame(() => {
      const { width, height } = getElementSize(target);
      node?.setSize({
        width,
        height,
      });
      editor?.emit('node:autoresize', node);
    });
  };

  const minStyle = { minWidth: 0, minHeight: 0 };
  if (editor) {
    const { size } = shape2Theme(node.shape, editor.theme);
    minStyle.minWidth = size.width;
    minStyle.minHeight = size.height;
  }

  return (
    <div
      className={cls(['kangmi-node', styles.node, className])}
      ref={targetRef}
      style={{
        position: 'absolute',
        ...minStyle,
        ...style,
      }}
    >
      <div className={styles.image} />
      <div className={styles.mainLine}>
        <IconList node={node} onChange={changeHandler} />
        <HtmlText node={node} onChange={changeHandler} />
        <div className={styles.remark}>{/* <TextMessage /> */}</div>
      </div>
      <div className={styles.tags}>
        <span />
      </div>
    </div>
  );
}

function getElementSize(ele: Element) {
  const box = ele.getBoundingClientRect();

  const width = box.width;
  const height = box.height;

  return { ...box, width, height };
}
