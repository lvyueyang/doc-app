/**
 * 三角形
 */
import type { KMReactNode, ReactNodeProps } from '../types';
import { createNodeName, updatePort, getLineCenter, createTextBlock, getLineType } from '../utils';
import { DefaultNodeConfig, DefaultPortsGroups } from '../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const DiamondNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body;

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    [0.5, h - 0.5],
    [0.5, 0.5],
    [w - 0.5, h / 2 - 0.5],
  ];

  useEffect(() => {
    const [a, b, c] = points;
    updatePort(node, [
      {
        group: 'absolute',
        id: 'leftTop',
        args: {
          x: b[0] * 2,
          y: b[1] * 2,
        },
      },
      {
        group: 'absolute',
        id: 'leftBottom',
        args: {
          x: a[0] * 2,
          y: a[1] * 2,
        },
      },
      {
        group: 'absolute',
        id: 'rightCenter',
        args: {
          x: c[0] * 2,
          y: c[1] * 2,
        },
      },
      {
        group: 'absolute',
        id: 'a',
        args: getLineCenter({ x: b[0], y: b[1] }, { x: a[0], y: a[1] * 2 }),
      },
      {
        group: 'absolute',
        id: 'b',
        args: getLineCenter({ x: b[0], y: b[1] }, { x: c[0] * 2, y: c[1] * 2 }),
      },
      {
        group: 'absolute',
        id: 'c',
        args: getLineCenter({ x: a[0], y: a[1] * 2 }, { x: c[0] * 2, y: c[1] * 2 }),
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

export const DiamondNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Diamond'),
  Component: DiamondNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
  attrs: {
    body: {
      fill: DefaultNodeConfig.fill,
      stroke: DefaultNodeConfig.stroke,
      strokeWidth: DefaultNodeConfig.strokeWidth,
    },
  },
};
