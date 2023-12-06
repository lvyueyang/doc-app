import type { Point } from './utils';
import { add, dot, getUnitVector, isParallel, multiply, vectorFromPoints } from './utils';

interface Options {
  entryPoint: Point;
  entryDirection: Point;
  entryExt?: number;
  exitPoint: Point;
  exitDirection: Point;
  exitExt?: number;
}

// 中线智能 避让

// let turnRatio = 0.5

// 描述方向 使用svg 平面轴 上：[0,-1] 右：[1,0] 下 [1,1] 左 [-1,0]
// path 指除了延申线之外的连接线
function generateConnectionPoints(options: Options, turnRatio: number = 0.5) {
  const {
    entryPoint = [0, 0],
    entryDirection = [0, 1],
    entryExt = 10,
    exitPoint = [10, 10],
    exitDirection: exitDirectionOptions = [1, 0],
    exitExt = 10,
  } = options;
  let exitDirection = exitDirectionOptions;
  // 1. 获得入方向和出方向 ——参数中已获得; 当exitDirection 未定义时
  if (exitDirection === null || exitDirection.join() === '0,0') {
    const entryToExit = vectorFromPoints(exitPoint, entryPoint);
    if (Math.abs(entryToExit[0]) > Math.abs(entryToExit[1])) {
      exitDirection = [entryToExit[0] / Math.abs(entryToExit[0]), 0];
    } else {
      exitDirection = [0, entryToExit[1] / Math.abs(entryToExit[1])];
    }
  }

  // 2. 获得直接 path 的水平和竖直方向
  const pathStartP = add(entryPoint, multiply(entryDirection, entryExt));
  const pathEndP = add(exitPoint, multiply(exitDirection, exitExt));

  // 出口方向需要取反
  exitDirection = multiply(exitDirection, -1);

  // 直接path的向量
  // let pathVec = vectorFromPoints(pathEndP,pathStartP);
  // path的水平向量
  const pathHorizenVec: Point = [pathEndP[0] - pathStartP[0], 0];
  // path 的竖直向量
  const pathVerticalVec: Point = [0, pathEndP[1] - pathStartP[1]];

  // 3.计算path 的起始方向： 两方向与入方向平行的一项，如果是同向则取之，反之则取非平行的一项
  const comp = [pathHorizenVec, pathVerticalVec];
  let pathStart;
  const startParallelVec = comp.find((vec) => isParallel(vec, entryDirection));

  if (dot(startParallelVec!, entryDirection) > 0) {
    pathStart = startParallelVec;
  } else {
    pathStart = anotherOne(comp, startParallelVec);
  }

  // 4.计算path 的末方向： 两方向与末方向平行的一项，如果是同向则取之，反之则取非平行的一项
  let pathEnd;
  const endParallelVec = comp.find((vec) => isParallel(vec, exitDirection));

  if (dot(endParallelVec!, exitDirection) > 0) {
    pathEnd = endParallelVec;
  } else {
    pathEnd = anotherOne(comp, endParallelVec);
  }

  // 5.如果path的起末为同方向，则分为两段，否则为1段
  const splitNum = dot(pathStart as Point, pathEnd as Point) > 0 ? 2 : 1;

  const pathMiddle = anotherOne(comp, pathEnd);

  // 6.计算path中的转折点 返回数据中加入了单位向量
  const points = [];
  points.push(
    {
      position: entryPoint,
      direction: null,
    },
    {
      position: pathStartP,
      direction: entryDirection,
    },
  );
  if (splitNum === 1) {
    const point1 = add(pathStartP, pathStart);
    const dir1 = getUnictVecByStraight(pathStart);
    const point2 = add(point1, pathEnd);
    const dir2 = getUnictVecByStraight(pathEnd);
    points.push(
      {
        position: point1,
        direction: dir1,
      },
      {
        position: point2,
        direction: dir2,
      },
    );
  } else {
    const point1 = add(pathStartP, multiply(pathStart, turnRatio));

    const dir1 = getUnictVecByStraight(pathStart);

    const point2 = add(point1, pathMiddle!);
    const dir2 = getUnictVecByStraight(pathMiddle!);
    const point3 = add(point2, multiply(pathEnd, 1 - turnRatio));
    const dir3 = getUnictVecByStraight(pathEnd);

    points.push(
      {
        position: point1,
        direction: dir1,
      },
      {
        position: point2,
        direction: dir2,
        type: 'pathMiddleP',
      },
      {
        position: point3,
        direction: dir3,
      },
    );
  }
  points.push({
    position: exitPoint,
    direction: exitDirection,
  });

  return points.filter((v) => v.direction !== false);
}

// 两个元素的数组中的另一个
function anotherOne<T = any>(comp: T[], a: T) {
  return comp.find((v) => v !== a);
}

// 获取竖直和水平向量的单位向量
function getUnictVecByStraight(vector: Point) {
  if (vector[0] === 0 && vector[1] === 0) return false;
  else if (vector[0] === 0) return [0, vector[1] / Math.abs(vector[1])];
  else if (vector[1] === 0) return [vector[0] / Math.abs(vector[0]), 0];
  else return getUnitVector(vector);
}

export default generateConnectionPoints;
