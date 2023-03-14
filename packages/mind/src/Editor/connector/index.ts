import type { Registry } from '@antv/x6';
import { Path } from '@antv/x6';

/** 连线类型 */
export const enum ConnectionType {
  /** 正交 */
  orth = 'orth',
  /** 圆角 */
  rounded = 'rounded',
}

interface ConnectionItem {
  NAME: string;
  entity: Registry.Connector.Definition<Registry.Connector.BaseOptions & { type: ConnectionType }>;
  force: boolean;
}

/** 左右结构连线 */
export const MindMapLRConnector: ConnectionItem = {
  NAME: 'mindMapLR',
  entity: (sourcePoint, targetPoint, routerPoints, options) => {
    const distanceX = targetPoint.x - sourcePoint.x; // 起点与终点的水平距离
    const distanceY = targetPoint.y - sourcePoint.y; // 起点与终点的垂直距离

    // 中间点坐标
    const midX = distanceX / 1.5 + sourcePoint.x;
    const midY = distanceY / 1.5 + sourcePoint.y;

    // 正交
    const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${sourcePoint.y}
     L ${midX} ${midY}
     L ${midX} ${targetPoint.y}
     L ${targetPoint.x} ${targetPoint.y}
    `;

    return options.raw ? Path.parse(pathData) : pathData;
  },
  force: true,
};

/** 上下结构连线 */
export const MindMapTBConnector: ConnectionItem = {
  NAME: 'mindMapTB',
  entity: (sourcePoint, targetPoint, routerPoints, options) => {
    const distanceX = targetPoint.x - sourcePoint.x; // 起点与终点的水平距离
    const distanceY = targetPoint.y - sourcePoint.y; // 起点与终点的垂直距离

    // 中间点坐标
    const midX = distanceX / 1.5 + sourcePoint.x;
    const midY = distanceY / 1.5 + sourcePoint.y;

    // 正交
    const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${sourcePoint.x} ${midY}
     L ${midX} ${midY}
     L ${targetPoint.x} ${midY}
     L ${targetPoint.x} ${targetPoint.y}
    `;

    return options.raw ? Path.parse(pathData) : pathData;
  },
  force: true,
};
