/**
 * 半扇形
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import {
  createNodeName,
  updatePort,
  createTextBlock,
  getLineType,
  points2PortGroups,
} from '../utils';
import { DefaultPortsGroups } from '../../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const Fan2NodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    ['M', 0.5, h / 6 - 0.5],
    ['Q', w / 2 - 0.5, 0 - h / 6 + 1.5, w - 0.5, h / 6 - 0.5],
    ['L', w - w / 4 - 0.5, h - 0.5],
    ['Q', w / 2 - 0.5, h - h / 6, w / 4 - 0.5, h - 0.5],
    ['Z'],
  ];
  const [a, b, c, d] = points;
  const dstr = points.map((item) => item.join(' ')).join(' ');

  useEffect(() => {
    updatePort(
      node,
      points2PortGroups({
        a: [a[1] as number, a[2] as number],
        b: [b[1] as number, 0.5],
        c: [b[3] as number, b[4] as number],
        d: [c[1] as number, c[2] as number],
        e: [d[3] as number, d[4] as number],
      }),
    );
  }, [width, height]);

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path
          d={dstr}
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

export const Fan2NodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Fan2'),
  Component: Fan2NodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
};
