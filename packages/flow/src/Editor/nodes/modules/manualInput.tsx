/**
 * 人工输入
 */
import { useEffect } from 'react';
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock, getLineCenter, getLineType, updatePort } from '../utils';

const TextBlock = createTextBlock();

const ManualInputNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    ['M', 0.5, h / 5],
    ['L', w - 0.5, 0.5],
    ['L', w - 0.5, h - 0.5],
    ['L', 0.5, h - 0.5],
    ['Z'],
  ];
  const [a, b] = points;
  const dstr = points.map((item) => item.join(' ')).join(' ');

  useEffect(() => {
    updatePort(node, [
      {
        group: 'absolute',
        id: 'a',
        args: getLineCenter(
          { x: (a[1] as number) * 2, y: (a[2] as number) * 2 },
          { x: (b[1] as number) * 2, y: (b[2] as number) * 2 },
        ),
      },
    ]);
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

export const ManualInputNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('ManualInput'),
  Component: ManualInputNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
    items: [
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  },
  propHooks: TextBlock.propHooks,
};
