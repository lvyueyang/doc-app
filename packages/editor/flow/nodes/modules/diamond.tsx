import type { KMReactNode, ReactNodeProps } from '../types';
import { createNodeName, updatePort, getLineCenter } from '../utils';
import { DefaultNodeConfig, portDefaultStyle } from '../constants';
import { useEffect } from 'react';

const DiamondNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke } = node.getAttrs() as unknown as Record<string, string>;

  const w = width / 2;
  const h = height / 2;

  const [a, b, c] = [
    [1, h - 1],
    [1, 1],
    [w - 1, h / 2 - 1],
  ];

  useEffect(() => {
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
          points={`${a.join(' ')} ${b.join(' ')} ${c.join(' ')}`}
          fill={fill && fill !== 'none' ? fill : DefaultNodeConfig.fill}
          stroke={stroke || DefaultNodeConfig.stroke}
        />
        您的设备不支持 SVG
      </svg>
    </>
  );
};

export const DiamondNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Diamond'),
  Component: DiamondNodeComponent,
  ports: {
    groups: {
      absolute: {
        position: {
          name: 'absolute',
        },
        attrs: {
          ...portDefaultStyle,
        },
      },
      line: {
        position: {
          name: 'line',
          args: {
            start: { x: 1, y: 1 },
            end: { x: 1, y: 90 },
          },
        },
        attrs: {
          ...portDefaultStyle,
        },
      },
    },
    items: [],
  },
};
