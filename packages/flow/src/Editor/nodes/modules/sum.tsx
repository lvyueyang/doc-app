/**
 * 或
 */
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock, getLineType } from '../utils';

const TextBlock = createTextBlock();

const SumNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const body = node.getAttrs().shape || {};
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const pathProps = {
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
        style={body.style as React.CSSProperties}
      >
        <g style={{ transform: 'translateX(.5px) translateY(.5px)' }}>
          <ellipse {...pathProps} cx={w / 2} cy={h / 2} rx={w / 2} ry={h / 2} />
          <path {...pathProps} d={`M ${w / 5} ${h / 5} L ${w - w / 5} ${h - h / 5} Z`} />
          <path {...pathProps} d={`M ${w / 5} ${h - h / 5} L ${w - w / 5} ${h / 5} Z`} />
        </g>
        您的设备不支持 SVG
      </svg>
      <HtmlText node={node} style={{ position: 'initial', height: 'auto', minHeight: 30 }} />
    </>
  );
};

export const SumNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Sum'),
  Component: SumNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
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
