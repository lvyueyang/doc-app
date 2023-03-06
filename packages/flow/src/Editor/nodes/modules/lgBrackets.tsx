/**
 * 大括号
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

const LgBracketsNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const body = node.getAttrs().shape || {};
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const points = svgPath2Array(
    'M 1677 1675 L 1672 1675 Q 1667 1675 1667 1685 L 1667 1725 Q 1667 1735 1662 1735 L 1659.5 1735 Q 1657 1735 1662 1735 L 1664.5 1735 Q 1667 1735 1667 1745 L 1667 1785 Q 1667 1795 1672 1795 L 1677 1795',
  ).map((g) => {
    return g.map((item, index) => {
      if (index > 0 && typeof item === 'number') {
        if (index % 2 !== 0) {
          return ((item - 1677) / 18.3) * w + w;
        } else {
          return ((item - 1675) / 120) * h + 0.5;
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
        style={body.style as React.CSSProperties}
      >
        <path
          d={d}
          fill="none"
          stroke={stroke as string}
          strokeWidth={(strokeWidth as number) / 2}
          strokeDasharray={strokeDasharray}
        />
        您的设备不支持 SVG
      </svg>
    </>
  );
};

export const LgBracketsNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('LgBrackets'),
  Component: LgBracketsNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
  },
  propHooks: TextBlock.propHooks,
};
