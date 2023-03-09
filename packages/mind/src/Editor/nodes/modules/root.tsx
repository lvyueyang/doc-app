/**
 * 根节点
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock, getLineType } from '../utils';

const TextBlock = createTextBlock();

const RootNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType, rx = 0 } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect
          x={0}
          y={0}
          width={w}
          height={h}
          rx={rx as number}
          fill={fill as string}
          stroke={stroke as string}
          strokeWidth={(strokeWidth as number) / 2}
          strokeDasharray={strokeDasharray}
        />
        您的设备不支持 SVG
      </svg>
      <HtmlText node={node} />
    </>
  );
};

export const RootNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Root'),
  Component: RootNodeComponent,
  propHooks: TextBlock.propHooks,
};
