/**
 * 五角星
 */
import { useEffect } from 'react';
import { DefaultPortsGroups } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import {
  createNodeName,
  createTextBlock,
  getLineType,
  points2PortGroups,
  updatePort,
} from '../utils';

const TextBlock = createTextBlock();

const StarNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const step = 2.5;

  const points = [
    [w / 2, 0.5],
    [w / 2.8, h / 2.5],
    [0.5, h / 2.5],

    [w / 3.2, h / 2.5 + h / 4.5],
    [w / 4.9, h - 0.5],
    [w / 2, h / 2.5 + h / 4.5 + (h - (h / 2.5 + h / 4.5)) / 3],

    [w - w / 4.9, h - 0.5],
    [w - w / 3.2, h / 2.5 + h / 4.5],
    [w - 0.5, h / 2.5],

    [w - w / 2.8, h / 2.5],
  ];

  useEffect(() => {
    const [a, , b, , , c, , , d] = points;
    updatePort(node, points2PortGroups({ a, b, c, d }));
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

export const StarNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Star'),
  Component: StarNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
};
