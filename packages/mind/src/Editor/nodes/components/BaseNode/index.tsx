import type { Cell, Node } from '@antv/x6';
import { cls } from '@kangmi/utils';
import { useEffect, useRef } from 'react';
import { useMindEditor } from '../../../../hooks';
import { shape2Theme } from '../../../utils';
import HtmlText from '../HtmlText';
import Collapse from './Collapse';
import IconList from './IconList';
import styles from './index.module.less';
import RemarkItem from './Remark';
import TagList from './TagList';

interface BaseNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  node: Node;
}

export default function BaseNode({ node, className, style }: BaseNodeProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const boxStyle = (node.getAttrs()?.box.style as React.CSSProperties) || {};
  const { editor } = useMindEditor();

  useEffect(() => {
    const changFn = (e: Cell.ChangeArgs<any>) => {
      const prevStyle = e.previous?.label?.style as React.CSSProperties;
      const currentStyle = e.current?.label?.style as React.CSSProperties;
      if (prevStyle?.fontSize !== currentStyle?.fontSize) {
        changeHandler();
      }
    };
    node.on('change:attrs', changFn);
    return () => {
      node?.off('change:attrs', changFn);
    };
  }, []);

  if (!editor) return null;

  const changeHandler = () => {
    const target = targetRef.current;
    if (!target) return;
    window.requestAnimationFrame(() => {
      const minSize = shape2Theme(node.shape, editor?.getTheme()).size;
      const { width, height } = getElementSize(target, minSize);

      node?.setSize({
        width,
        height,
      });
      editor?.emit('node:autoresize', node);
    });
  };

  const minStyle = { minWidth: 0, minHeight: 0 };
  const { size } = shape2Theme(node.shape, editor.getTheme());
  minStyle.minWidth = size.width;
  minStyle.minHeight = size.height;

  return (
    <div
      className={cls(['kangmi-node', className, styles.node])}
      ref={targetRef}
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 15px',
        boxSizing: 'border-box',
        ...minStyle,
        ...style,
        ...boxStyle,
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
      <Collapse node={node} onChange={changeHandler} />
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
