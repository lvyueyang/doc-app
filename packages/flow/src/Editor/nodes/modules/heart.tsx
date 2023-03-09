/**
 * 心形
 */
import { useEffect } from 'react';
import { DefaultPortsGroups } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import {
  createNodeName,
  createTextBlock,
  getLineType,
  svgPath2Array,
  svgPathArray2String,
} from '../utils';

const TextBlock = createTextBlock();

const HeartNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = svgPath2Array(
    'M 1667 1785 C 1670.7 1780.82 1691.89 1756.94 1705.13 1742.03 C 1717 1728.67 1716.74 1709.18 1705.96 1697.1 C 1695.17 1685 1677.73 1685.05 1667 1697.2 C 1656.26 1685.05 1638.82 1685 1628.04 1697.09 C 1617.25 1709.17 1617 1728.66 1628.86 1742.03 C 1642.1 1756.94 1663.29 1780.82 1667 1785 Z',
  ).map((g) => {
    return g.map((item, index) => {
      if (index > 0 && typeof item === 'number') {
        if (index % 2 !== 0) {
          return ((item - 1667) / 100) * w + w / 2;
        } else {
          return ((item - 1685) / 100) * h - 0.5;
        }
      }
      return item;
    });
  });
  const dstr = svgPathArray2String(points);
  // const [a, b, , c, , d] = points;

  useEffect(() => {
    // updatePort(
    //   node,
    //   points2PortGroups({
    //     a: [a[1] as number, a[2] as number],
    //     b: [b[5] as number, b[6] as number],
    //     c: [c[5] as number, c[6] as number],
    //     d: [d[5] as number, d[6] as number],
    //     // c: [w / 2, h],
    //     // d: [c[5] as number, c[6] as number],
    //   }),
    // );
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

export const HeartNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Heart'),
  Component: HeartNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
    },
    items: [],
  },
  propHooks: TextBlock.propHooks,
};
