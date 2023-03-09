/**
 * 三角形
 */
import { useEffect } from 'react';
import { DefaultPortsGroups } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import {
  createNodeName,
  createTextBlock,
  getLineCenter,
  getLineType,
  points2PortGroups,
  updatePort,
} from '../utils';

const TextBlock = createTextBlock();

const Diamond2NodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body;

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    [w / 2 + 0.5, 0.5],
    [w - 0.5, h - 0.5],
    [0.5, h - 0.5],
  ];

  useEffect(() => {
    const [a, b, c] = points;
    const options = points2PortGroups({ a, b, c });
    updatePort(node, [
      ...options,
      {
        group: 'absolute',
        id: 'ac',
        args: getLineCenter({ x: a[0] * 2, y: a[1] * 2 }, { x: c[0] * 2, y: c[1] * 2 }),
      },
      {
        group: 'absolute',
        id: 'ab',
        args: getLineCenter({ x: a[0] * 2, y: a[1] * 2 }, { x: b[0] * 2, y: b[1] * 2 }),
      },
      {
        group: 'absolute',
        id: 'bc',
        args: getLineCenter({ x: b[0] * 2, y: b[1] * 2 }, { x: c[0] * 2, y: c[1] * 2 }),
      },
    ]);
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

export const Diamond2NodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Diamond2'),
  Component: Diamond2NodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
};
