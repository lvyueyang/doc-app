/**
 * 水滴
 */
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import { createNodeName, createTextBlock, getLineType } from '../utils';

const TextBlock = createTextBlock();

const MdBracketsNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const body = node.getAttrs().shape || {};
  const { stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

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
          d={`M ${w} .5 L .5 .5 L .5 ${h + 0.5} L ${w} ${h + 0.5}`}
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

export const MdBracketsNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('MdBrackets'),
  Component: MdBracketsNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
  },
  propHooks: TextBlock.propHooks,
};
