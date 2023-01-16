import { Graph } from '@antv/x6';

Graph.registerPortLayout(
  '三角形链接桩',
  (portsPositionArgs, elemBBox, args) => {
    const boxW = elemBBox.width;
    const boxH = elemBBox.height;
    // 斜边长度
    const w = Math.sqrt(Math.pow(elemBBox.width, 2) + Math.pow(elemBBox.height / 2, 2));
    // cos(角度)
    const cos = w / (boxH / 2);
    // 求出直角边
    const y1 = w / 2 / cos;
    // 求出一个边的 y
    const y = boxH - y1;
    // 勾股求出 x
    const x = Math.sqrt(Math.pow(w / 2, 2) - Math.pow(y1, 2));

    const result = [
      {
        position: {
          x,
          y,
        },
      },
      {
        position: {
          x,
          y: y1,
        },
      },
      {
        position: {
          x: 0,
          y: elemBBox.height / 2,
        },
      },
      {
        position: {
          x: boxW,
          y: boxH / 2,
        },
      },
      {
        position: {
          x: 0,
          y: 0,
        },
      },
      {
        position: {
          x: 0,
          y: boxH,
        },
      },
    ];
    return result;
  },
  true,
);
