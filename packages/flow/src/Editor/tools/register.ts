import { Graph } from '@antv/x6';
import { NodeTextEditor } from './editor';

Graph.registerNodeTool('node-text-editor', NodeTextEditor, true);
Graph.registerEdgeTool('edge-text-editor', NodeTextEditor, true);
