import { Graph } from '@antv/x6';

interface Points {
  x: number;
  y: number;
}

Graph.registerPortLayout(
  '三角形链接桩',
  (portsPositionArgs, box) => {
    const { width, height } = box;
    const a = { x: 0, y: 0 };
    const b = { x: width, y: height / 2 };
    const c = { x: 0, y: box.height };
    return [
      {
        position: getLineCenter(a, b),
      },
      {
        position: getLineCenter(a, c),
      },
      {
        position: getLineCenter(b, c),
      },
      {
        position: {
          x: a.x,
          y: a.y,
        },
      },
      {
        position: {
          x: b.x,
          y: b.y,
        },
      },
      {
        position: {
          x: c.x,
          y: c.y,
        },
      },
    ];
  },
  true,
);

Graph.registerPortLayout(
  '平行四边形链接桩',
  (portsPositionArgs) => {
    const target = portsPositionArgs[0].target as SVGPolygonElement;
    if (target) {
      const { points } = target;
      const [bottomLeftPoint, bottomRightPoint, topRightPoint, topLeftPoint] = points;
      return [
        {
          position: getLineCenter(bottomLeftPoint, topLeftPoint),
        },
        {
          position: getLineCenter(topRightPoint, bottomRightPoint),
        },
        {
          position: getLineCenter(bottomLeftPoint, bottomRightPoint),
        },
        {
          position: getLineCenter(topRightPoint, topLeftPoint),
        },
      ];
    }
    return createDefaultResult(4);
  },
  true,
);

Graph.registerPortLayout(
  '云朵链接桩',
  (portsPositionArgs) => {
    const target = portsPositionArgs[0].target as HTMLElement;

    if (target) {
      const parent = target.parentElement;
      const path = parent?.querySelector('path');
      if (path) {
        const len = path.getTotalLength();
        const rang = Number((len / 6).toFixed(0));
        const arr: { x: number; y: number }[] = [];
        const loop = (num: number = 0) => {
          const next = num + rang;
          const point = path.getPointAtLength(num);
          arr.push(point);
          if (next >= len) {
            return;
          }
          if (arr.length === 6) {
            return;
          }
          loop(next);
        };
        loop();
        return arr.map((position) => ({ position }));
      }
    }
    return createDefaultResult(6);
  },
  true,
);
// 计算线段中点坐标
function getLineCenter(start: Points, end: Points) {
  const x = (start.x + end.x) / 2;
  const y = (start.y + end.y) / 2;

  return {
    x,
    y,
  };
}

function createDefaultResult(max: number) {
  const res = [];
  for (let i = 0; i < max; i++) {
    res.push({
      position: {
        x: 0,
        y: 0,
      },
    });
  }
  return res;
}
