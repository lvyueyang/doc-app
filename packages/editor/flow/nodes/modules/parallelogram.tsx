import type { KMReactNode, ReactNodeProps } from '../types';
import { createNodeName, updatePort, getLineCenter, createTextBlock } from '../utils';
import { DefaultNodeConfig, DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const ParallelogramNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke } = node.getAttrs() as unknown as Record<string, string>;

  const w = width / 2;
  const h = height / 2;

  const auto = w * 0.25;

  const points = [
    [auto, 0.5],
    [w - 0.5, 0.5],
    [w - auto - 0.5, h - 0.5],
    [0.5, h - 0.5],
  ];
  const [a, b, c, d] = points;

  useEffect(() => {
    updatePort(node, [
      {
        group: 'absolute',
        id: 'leftCenter',
        args: getLineCenter({ x: a[0] * 2, y: a[1] * 2 }, { x: d[0] * 2, y: d[1] * 2 }),
      },
      {
        group: 'absolute',
        id: 'rightCenter',
        args: getLineCenter({ x: b[0] * 2, y: b[1] * 2 }, { x: c[0] * 2, y: c[1] * 2 }),
      },
    ]);
  }, [width, height]);

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <polygon
          points={points.map((item) => item.join(' ')).join(' ')}
          fill={fill && fill !== 'none' ? fill : DefaultNodeConfig.fill}
          stroke={stroke || DefaultNodeConfig.stroke}
        />
        您的设备不支持 SVG
      </svg>
      <HtmlText node={node} />
    </>
  );
};

export const ParallelogramNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Parallelogram'),
  Component: ParallelogramNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
    items: [
      {
        group: 'top',
        id: 'top',
      },
      {
        group: 'bottom',
        id: 'bottom',
      },
    ],
  },
  propHooks: TextBlock.propHooks,
};
