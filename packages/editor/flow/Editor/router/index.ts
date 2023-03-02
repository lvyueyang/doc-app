import type { EdgeView, Point, Rectangle } from '@antv/x6';
import { Util } from '@antv/x6';
import { getLineCenter } from '../nodes/utils';
import orthogonal from './orthogonal';

interface FlowRouterArgs {}

export function flowRouter(vertices: Point.PointLike[], args: FlowRouterArgs, view: EdgeView) {
  console.log('vertices: ', vertices);
  console.log('view: ', view);

  const { sourceAnchor: start, targetAnchor: end } = view;
  const sourceNode = view.sourceView?.getBBox();
  console.log('sourceNode: ', sourceNode);
  console.log('start', start);
  const targetNode = view.targetView?.getBBox();
  console.log('targetNode: ', targetNode);
  console.log('end', end);

  const points = orthogonal({
    entryPoint: [start.x, start.y],
    entryDirection: [0, 1],
    exitPoint: [end.x, end.y],
    exitDirection: [1, 0],
  });
  console.log('points:', points);
  return points.map((item) => ({ x: item.position[0], y: item.position[1] }));
}

function getDirection({ x, y }: Point, box: Rectangle, endPoint: Point): [0 | 1 | -1, 0 | 1 | -1] {
  const canBottom = y + 10 > box.y + box.height; // 可以在下面
  const canRight = x + 10 > box.x + box.width;

  if (canRight) {
    return [1, 0];
  }
  if (canBottom) {
    return [0, -1];
  }
}
