/**
 * 五边形
 */
import type { KMReactNode, ReactNodeProps } from '../types';
import { createNodeName, updatePort, getLineCenter, createTextBlock, getLineType } from '../utils';
import { DefaultNodeConfig, DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const ParallelogramNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

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
  attrs: {
    body: {
      fill: DefaultNodeConfig.fill,
      stroke: DefaultNodeConfig.stroke,
      strokeWidth: DefaultNodeConfig.strokeWidth,
    },
  },
  propHooks: TextBlock.propHooks,
};
