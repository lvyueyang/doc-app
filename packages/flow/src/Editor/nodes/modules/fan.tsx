/**
 * 扇形
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

const FanNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    ['M', 0.5, h / 6 - 0.5],
    ['Q', w / 2 - 0.5, 0 - h / 6 + 1.5, w - 0.5, h / 6 - 0.5],
    ['L', w / 2 - 0.5, h - 0.5],
    ['Z'],
  ];
  const [a, b, c] = points;
  const d = points.map((item) => item.join(' ')).join(' ');

  useEffect(() => {
    updatePort(
      node,
      points2PortGroups({
        a: [a[1] as number, a[2] as number],
        b: [b[1] as number, 0.5],
        c: [b[3] as number, b[4] as number],
        d: [c[1] as number, c[2] as number],
      }),
    );
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

export const FanNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Fan'),
  Component: FanNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
};
