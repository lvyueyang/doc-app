import type { Node } from '@antv/x6';
import { DefaultTextStyle, TextEditorClassName } from '../../constants';

interface HtmlTextProps extends React.HTMLAttributes<HTMLDivElement> {
  node?: Node;
}

const DefaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'transparent',
  margin: '0',
  padding: '0px 5px',
  width: '100%',
  height: '100%',
  display: 'flex',
  boxSizing: 'border-box',
  ...DefaultTextStyle,
};

export default function HtmlText({ style = {}, className, node }: HtmlTextProps) {
  const { label } = node?.getAttrs() ?? {};
  const text = label.text;
  const styles = label.style as React.CSSProperties;
  return (
    <div
      style={{
        ...DefaultStyle,
        ...style,
        ...styles,
      }}
      className={[TextEditorClassName, className].filter((i) => !!i).join(' ')}
      dangerouslySetInnerHTML={{ __html: text as string }}
    />
  );
}
