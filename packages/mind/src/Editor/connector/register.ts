import { Graph } from '@antv/x6';
import * as connectors from './index';

Object.values(connectors).forEach(({ NAME, entity, force }) => {
  Graph.registerConnector(NAME, entity, force);
});
