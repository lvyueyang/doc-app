import { Graph } from '@antv/x6';
import { NodeTextEditor, EdgeTextEditor } from './editor';

Graph.registerNodeTool('node-text-editor', NodeTextEditor, true);
Graph.registerEdgeTool('edge-text-editor', EdgeTextEditor, true);
