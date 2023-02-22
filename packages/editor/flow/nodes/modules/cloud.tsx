/**
 * 云朵
 */
import type { KMReactNode, ReactNodeProps } from '../types';
import { createNodeName, updatePort, createTextBlock, getLineType } from '../utils';
import { DefaultNodeConfig, DefaultPortsGroups } from '../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const CloudNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    ['M', 70, 40],
    ['C', -5, 40, -24, 104, 36, 117],
    ['C', -24, 145, 43, 207, 92, 181],
    ['C', 127, 232, 240, 232, 278, 181],
    ['C', 354, 181, 354, 130, 307, 104],
    ['C', 354, 53, 278, 1, 212, 27],
    ['C', 165, -11, 89, -11, 70, 40],
    ['Z'],
  ].map((g) => {
    return g.map((item, index) => {
      if (index > 0 && typeof item === 'number') {
        if (index % 2 !== 0) {
          return (item / (340 + 6)) * w + 0.5;
        } else {
          return (item / (220 + 6)) * h + 0.5;
        }
      }
      return item;
    });
  });
  const d = points.map((item) => item.join(' ')).join(' ');

  useEffect(() => {
    updatePort(node, []);
  }, [width, height]);

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path
          d={d}
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

export const CloudNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Cloud'),
  Component: CloudNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  attrs: {
    body: {
      fill: DefaultNodeConfig.fill,
      stroke: DefaultNodeConfig.stroke,
      strokeWidth: DefaultNodeConfig.strokeWidth,
    },
  },
  propHooks: TextBlock.propHooks,
};
