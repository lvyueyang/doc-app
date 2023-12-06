/**
 * 水滴
 */
import { TRBL_CENTER_GROUPS } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock, getLineType } from '../utils';

const TextBlock = createTextBlock();

const ParallelNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const lineProps = {
    fill: fill as string,
    stroke: stroke as string,
    strokeWidth: (strokeWidth as number) / 2,
    strokeDasharray,
  };
  return (
    <>
      <svg
        viewBox={`0 0 ${w + 1} ${h + 1}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <svg>
          <path {...lineProps} d={`M 0 0.5 L ${w} 0.5 Z`} />
          <path {...lineProps} d={`M 0 ${h} L ${w} ${h} Z`} />
        </svg>
        您的设备不支持 SVG
      </svg>
      <HtmlText node={node} />
    </>
  );
};

export const ParallelNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Parallel'),
  Component: ParallelNodeComponent,
  ports: {
    groups: {
      ...TRBL_CENTER_GROUPS,
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'bottom',
      },
    ],
  },
  propHooks: TextBlock.propHooks,
};
