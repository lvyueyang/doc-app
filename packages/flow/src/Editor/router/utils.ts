export type Point = [number, number];

// 向量相加 或者 向量与坐标相加
export const add = function (vectorA: Point, vectorB: Point): Point {
  return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1]];
};

// 向量乘以常量系数
export const multiply = function (vector: Point, k: number): Point {
  return [vector[0] * k, vector[1] * k];
};

// 两点之间的向量，a点指向b点
export const vectorFromPoints = function (pointA: Point, pointB: Point): Point {
  return [pointB[0] - pointA[0], pointB[1] - pointA[1]];
};

// 判断向量是否平行
export const isParallel = function (vectorA: Point, vectorB: Point) {
  if (vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0] === 0) return true;

  return false;
};

// 向量点积
export const dot = function (vectorA: Point, vectorB: Point) {
  return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];
};
// 向量叉乘
export const cross = function (vectorA: Point, vectorB: Point) {
  return vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0];
};

// 向量夹角
export const angleFrom = function (vector: Point) {
  return Math.acos(vector[0] / Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]));
};

// 获取向量的单位向量
export const getUnitVector = function (vector: Point): Point {
  const m = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
  return [vector[0] / m, vector[1] / m];
};

// 判断向量 x,y 坐标相等
export const equals = function (vector: Point, target: Point) {
  return vector[0] === target[0] && vector[1] === target[1];
};
