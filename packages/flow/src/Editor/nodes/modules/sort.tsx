/**
 * 队列数据
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import {
  createNodeName,
  updatePort,
  createTextBlock,
  getLineType,
  points2PortGroups,
} from '../utils';
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const SortNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const pathProps = {
    fill: fill as string,
    stroke: stroke as string,
    strokeWidth: (strokeWidth as number) / 2,
    strokeDasharray: strokeDasharray,
  };

  return (
    <>
      <svg
        viewBox={`0 0 ${w + 2} ${h + 2}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <g style={{ transform: 'translateX(1px) translateY(1px)' }}>
          <polygon {...pathProps} points={`${w / 2} 0, ${w} ${h / 2}, ${w / 2} ${h}, 0 ${h / 2}`} />
          <path {...pathProps} d={`M ${w} ${h / 2} L 0 ${h / 2},`} />
          {/* <polygon {...pathProps} points={`${w / 2} ${h}, ${w} ${h / 2}, 0 ${h / 2}`} /> */}
        </g>
        您的设备不支持 SVG
      </svg>
      <HtmlText node={node} />
    </>
  );
};

export const SortNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Sort'),
  Component: SortNodeComponent,
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
