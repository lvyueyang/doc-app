/**
 * 条带
 */
import type { KMReactNode, ReactNodeProps } from '../types';
import { createNodeName, updatePort, createTextBlock, getLineType } from '../utils';
import { DefaultPortsGroups } from '../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const TapeNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    ['M', 0.5, 11],
    ['C', 15, 26, 30, 26, 45, 11],
    ['C', 60, -3, 75, -3, 89.5, 11],
    ['L', 89.5, 48],
    ['C', 75, 33, 60, 33, 45, 48],
    ['C', 30, 63, 15, 63, 0.5, 48],
    ['L', 0.5, 11],
    ['Z'],
  ].map((g) => {
    return g.map((item, index) => {
      if (index > 0 && typeof item === 'number') {
        if (index % 2 !== 0) {
          return (item / 180) * width;
        } else {
          return (item / 120) * height;
        }
      }
      return item;
    });
  });
  const [, a, , , b] = points;
  const d = points.map((item) => item.join(' ')).join(' ');

  useEffect(() => {
    updatePort(node, [
      {
        id: 'topCenter',
        group: 'absolute',
        args: {
          x: (a[5] as number) * 2,
          y: (a[6] as number) * 2,
        },
      },
      {
        id: 'bottomCenter',
        group: 'absolute',
        args: {
          x: (b[5] as number) * 2,
          y: (b[6] as number) * 2,
        },
      },
      {
        id: 'leftCenter',
        group: 'absolute',
        args: {
          x: 1.5,
          y: height / 2,
        },
      },
      {
        id: 'rightCenter',
        group: 'absolute',
        args: {
          x: width - 1.5,
          y: height / 2,
        },
      },
    ]);
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

export const TapeNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Tape'),
  Component: TapeNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
};
