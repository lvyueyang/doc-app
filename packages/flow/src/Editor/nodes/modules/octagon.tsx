/**
 * 八边形
 */
import { DefaultPortsGroups, TRBL_CENTER_GROUPS } from '../../constants';
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock, getLineType } from '../utils';

const TextBlock = createTextBlock();

const OctagonNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  const { width, height } = node.getSize();
  const { fill, stroke, strokeWidth, lineType } = node.getAttrs().body || {};

  const strokeDasharray = getLineType({ strokeWidth, lineType });

  const w = width / 2;
  const h = height / 2;

  const step = 3.5;

  const points = [
    [w / step, 0.5],
    [0.5, h / step],
    [0.5, h / 2 - h / step + h / 2],
    [w / step, h - 0.5],
    [w / 2 - w / step + w / 2, h - 0.5],
    [w - 0.5, h / 2 - h / step + h / 2],
    [w - 0.5, h / step],
    [w / 2 - w / step + w / 2, 0.5],
  ];

  // useEffect(() => {
  //   const [a, b, c, d, e, f, g, h] = points;
  //   updatePort(node, points2PortGroups({ a, b, c, d, e, f, g, h }));
  // }, [width, height]);

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

export const OctagonNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Octagon'),
  Component: OctagonNodeComponent,
  ports: {
    groups: {
      ...DefaultPortsGroups,
      ...TRBL_CENTER_GROUPS,
    },
    items: [{ group: 'top' }, { group: 'bottom' }, { group: 'left' }, { group: 'right' }],
  },
  propHooks: TextBlock.propHooks,
};
