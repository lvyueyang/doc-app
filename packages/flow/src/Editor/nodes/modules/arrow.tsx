/**
 * 大括号
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import { createNodeName, createTextBlock, getLineType, svgPathArray2String } from '../utils';
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../../constants';

const TextBlock = createTextBlock();

const ArrowNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const body = node.getAttrs().shape || {};
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = [
    ['M', w, h / 2 + 0.5],
    ['L', w - 25, 0.5],
    ['L', w - 25, h / 3 + 0.5],
    ['L', 0, h / 3 + 0.5],
    ['L', 0, (h / 3) * 2 + 0.5],
    ['L', w - 25, (h / 3) * 2 + 0.5],
    ['L', w - 25, h + 0.5],
    ['Z'],
  ];
  const d = svgPathArray2String(points);

  return (
    <>
      <svg
        viewBox={`0 0 ${w + 1} ${h + 1}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={body.style as React.CSSProperties}
      >
        <path
          d={d}
          fill={fill as string}
          stroke={stroke as string}
          strokeWidth={(strokeWidth as number) / 2}
          strokeDasharray={strokeDasharray}
        />
        您的设备不支持 SVG
      </svg>
    </>
  );
};

export const ArrowNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Arrow'),
  Component: ArrowNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
  },
  propHooks: TextBlock.propHooks,
};
