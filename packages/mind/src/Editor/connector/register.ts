import { Graph } from '@antv/x6';
import { MindMapLRConnector, MindMapTBConnector } from './index';

[MindMapLRConnector, MindMapTBConnector].forEach((item) => {
  const { NAME, entity, force } = item;
  Graph.registerConnector(NAME, entity, force);
});
