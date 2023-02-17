import type { Node } from '@antv/x6';
import { DefaultNodeConfig } from '../constants';

interface HtmlTextProps extends React.HTMLAttributes<HTMLDivElement> {
  node?: Node;
}

const DefaultStyle: React.CSSProperties = {
  fontSize: DefaultNodeConfig.fontSize,
  color: DefaultNodeConfig.fontColor,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function HtmlText({ style = {}, node }: HtmlTextProps) {
  const { fontSize, fontColor, label = DefaultNodeConfig.label } = node?.getAttrs()?.text || {};
  return (
    <div
      style={{
        ...DefaultStyle,
        fontSize: fontSize as number,
        color: fontColor as string,
        ...style,
      }}
      data-type="text-container"
    >
      <div dangerouslySetInnerHTML={{ __html: label as string }} />
    </div>
  );
}
