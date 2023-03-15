import type { Node } from '@antv/x6';
import { cls } from '@kangmi/utils';
import { useRef } from 'react';
import { useMindEditor } from '../../../../hooks';
import { shape2Theme } from '../../../utils';
import HtmlText from '../HtmlText';
import IconList from './IconList';
import styles from './index.module.less';
import RemarkItem from './Remark';
import TagList from './TagList';

interface BaseNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  node: Node;
}

export default function BaseNode({ node, className, style }: BaseNodeProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { editor } = useMindEditor();
  if (!editor) return null;
  const changeHandler = () => {
    const target = targetRef.current;
    if (!target) return;
    window.requestAnimationFrame(() => {
      const minSize = shape2Theme(node.shape, editor.theme).size;
      const { width, height } = getElementSize(target, minSize);

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
      className={cls(['kangmi-node', className])}
      ref={targetRef}
      style={{
        position: 'absolute',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8px 15px',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div className={styles.image} />
      <div
        className={styles.mainLine}
        style={{ display: 'inline-flex', flexWrap: 'nowrap', boxSizing: 'border-box' }}
      >
        <IconList node={node} onChange={changeHandler} />
        <HtmlText node={node} onChange={changeHandler} />
        <RemarkItem node={node} onChange={changeHandler} />
      </div>
      <TagList node={node} onChange={changeHandler} />
    </div>
  );
}

function getElementSize(ele: Element, minSize?: { width: number; height: number }) {
  const box = ele.getBoundingClientRect();

  let width = box.width;
  let height = box.height;

  if (minSize) {
    if (width < minSize.width) {
      width = minSize.width;
    }
    if (height < minSize.height) {
      height = minSize.height;
    }
  }

  return { ...box, width, height };
}
