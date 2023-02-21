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
};

export default function HtmlText({ style = {}, node }: HtmlTextProps) {
  const { label } = node?.getAttrs() || {};
  const { text, fontSize, color } = label || {};
  return (
    <div
      style={{
        ...DefaultStyle,
        fontSize: (fontSize as number) || DefaultNodeConfig.fontSize,
        color: (color as string) || DefaultNodeConfig.fontColor,
        ...style,
      }}
      data-type="text-container"
      dangerouslySetInnerHTML={{ __html: text as string }}
    />
  );
}
