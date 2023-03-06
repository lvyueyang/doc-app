/**
 * 水滴
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import {
  createNodeName,
  createTextBlock,
  getLineType,
  svgPath2Array,
  svgPathArray2String,
} from '../utils';
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../../constants';
import HtmlText from '../components/HtmlText';

const TextBlock = createTextBlock();

const DisplayNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = svgPath2Array(
    'M 1617 1735 L 1635 1705 L 1697.41 1705 C 1709.35 1710.38 1717 1722.1 1717 1735 C 1717 1747.9 1709.35 1759.62 1697.41 1765 L 1635 1765 L 1617 1735 Z',
  ).map((g) => {
    return g.map((item, index) => {
      if (index > 0 && typeof item === 'number') {
        if (index % 2 !== 0) {
          return ((item - 1617) / 100) * w + 0.5;
        } else {
          return ((item - 1735) / 60) * h + h / 2 + 0.5;
        }
      }
      return item;
    });
  });
  const d = svgPathArray2String(points);

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

export const DisplayNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Display'),
  Component: DisplayNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
    items: [
      {
        group: 'top',
      },
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
