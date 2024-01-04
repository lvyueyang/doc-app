import { Graph } from '@antv/x6';
import { CellEditor } from './editor';

Graph.registerNodeTool('node-text-editor', CellEditor, true);
Graph.registerEdgeTool('edge-text-editor', CellEditor, true);
