import type { Node } from '@antv/x6';
import { cls } from '@kangmi/utils';
import { useEffect, useRef } from 'react';
import { DefaultTextStyle, TextEditorClassName } from '../../constants';

interface HtmlTextProps extends React.HTMLAttributes<HTMLDivElement> {
  node?: Node;
  onChange?: () => void;
}

const DefaultStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  margin: '0',
  padding: '0',
  display: 'inline-flex',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  ...DefaultTextStyle,
};

export default function HtmlText({ style = {}, className, node, onChange }: HtmlTextProps) {
  const { label } = node?.getAttrs() ?? {};
  const text = label.text;
  const styles = label.style as React.CSSProperties;
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    const observer = new MutationObserver(() => {
      console.log(text);
      if (text !== target.innerHTML) {
        onChange?.();
      }
    });
    observer.observe(targetRef.current, {
      childList: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <div
        style={{
          ...DefaultStyle,
          ...style,
          ...styles,
        }}
        ref={targetRef}
        className={cls([TextEditorClassName, className])}
        dangerouslySetInnerHTML={{ __html: text as string }}
      />
    </>
  );
}
