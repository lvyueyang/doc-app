import type { KMReactNode, ReactNodeProps } from '../types';
import {
  createNodeName,
  updatePort,
  points2PortGroups,
  createTextBlock,
  getLineType,
} from '../utils';
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const PentagonNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    [w / 2, 0.5],
    [0.5, h / 2.5],
    [w / 5, h - 0.5],
    [w - w / 5, h - 0.5],
    [w - 0.5, h / 2.5],
  ];

  useEffect(() => {
    const [a, b, c, d, e] = points;
    updatePort(node, points2PortGroups({ a, b, c, d, e }));
  }, [width, height]);

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <polygon
          points={points.map((item) => item.join(' ')).join(' ')}
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

export const PentagonNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Pentagon'),
  Component: PentagonNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
    items: [
      {
        group: 'bottom',
      },
    ],
  },
  propHooks: TextBlock.propHooks,
};
