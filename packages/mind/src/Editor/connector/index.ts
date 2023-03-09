import type { Registry } from '@antv/x6';
import { Path } from '@antv/x6';

interface ConnectionItem {
  NAME: string;
  entity: Registry.Connector.Definition<Registry.Connector.BaseOptions>;
  force: boolean;
}
export const MindConnector: ConnectionItem = {
  NAME: 'mindmap',
  entity: (sourcePoint, targetPoint, routerPoints, options) => {
    const midX = sourcePoint.x + 10;
    const midY = sourcePoint.y;
    const ctrX = (targetPoint.x - midX) / 5 + midX;
    const ctrY = targetPoint.y;
    const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `;
    return options.raw ? Path.parse(pathData) : pathData;
  },
  force: true,
};
