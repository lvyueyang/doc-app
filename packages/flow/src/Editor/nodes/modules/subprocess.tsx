/**
 * 子流程
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import { createNodeName, createTextBlock, getLineType } from '../utils';
import { TRBL_CENTER_GROUPS } from '../../constants';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const SubprocessNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect
          fill={fill as string}
          stroke={stroke as string}
          strokeWidth={strokeWidth as number}
          strokeDasharray={strokeDasharray}
          width={w}
          height={h}
        />
        <path
          d={`M 8 0 L 8 ${h} Z`}
          fill={fill as string}
          stroke={stroke as string}
          strokeWidth={(strokeWidth as number) / 2}
          strokeDasharray={strokeDasharray}
        />
        <path
          d={`M ${w - 8} 0 L ${w - 8} ${h} Z`}
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

export const SubprocessNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Subprocess'),
  Component: SubprocessNodeComponent,
  ports: {
    groups: {
      ...TRBL_CENTER_GROUPS,
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  },
  propHooks: TextBlock.propHooks,
};
