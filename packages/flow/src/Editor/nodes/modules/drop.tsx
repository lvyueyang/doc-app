/**
 * 水滴
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import {
  createNodeName,
  updatePort,
  createTextBlock,
  getLineType,
  svgPath2Array,
  svgPathArray2String,
  points2PortGroups,
} from '../utils';
import { DefaultPortsGroups } from '../../constants';
import { useEffect } from 'react';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const DropNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = svgPath2Array(
    'M 1667 1685 L 1696.49 1731.15 C 1700.09 1736.78 1702 1743.32 1702 1750 C 1702 1759.28 1698.31 1768.18 1691.75 1774.75 C 1685.18 1781.31 1676.28 1785 1667 1785 C 1647.67 1785 1632 1769.33 1632 1750 C 1632 1743.32 1633.91 1736.78 1637.51 1731.15 Z',
  ).map((g) => {
    return g.map((item, index) => {
      if (index > 0 && typeof item === 'number') {
        if (index % 2 !== 0) {
          return ((item - 1667) / 70) * w + w / 2 + 0.5;
        } else {
          return ((item - 1685) / 100) * h + 0.5;
        }
      }
      return item;
    });
  });
  const d = svgPathArray2String(points);
  const [a, b, , , , , c] = points;

  useEffect(() => {
    updatePort(
      node,
      points2PortGroups({
        a: [a[1] as number, a[2] as number],
        b: [b[1] as number, b[2] as number],
        c: [w / 2, h],
        d: [c[5] as number, c[6] as number],
      }),
    );
  }, [width, height]);

  return (
    <>
      <svg
        viewBox={`0 0 ${w + 1} ${h + 1}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
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
      <HtmlText node={node} />
    </>
  );
};

export const DropNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Drop'),
  Component: DropNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
};
