import type { Node } from '@antv/x6';
import { DefaultNodeConfig } from '../constants';

interface HtmlTextProps extends React.HTMLAttributes<HTMLDivElement> {
  node?: Node;
}

const DefaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'transparent',
  textAlign: 'center',
  margin: '0',
  padding: '0px 5px',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  fontSize: DefaultNodeConfig.fontSize,
  color: DefaultNodeConfig.fontColor,
};

export default function HtmlText({ style = {}, node }: HtmlTextProps) {
  const { label } = node?.getAttrs() || {};
  const text = label.text;
  const styles = label.style as React.CSSProperties;
  return (
    <div
      style={{
        ...DefaultStyle,
        ...style,
        ...styles,
      }}
      data-type="text-container"
      dangerouslySetInnerHTML={{ __html: text as string }}
    />
  );
}
