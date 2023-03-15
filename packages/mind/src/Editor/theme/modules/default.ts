import { ConnectionType } from '../../connector';
import type { MindMapTheme } from '../types';

export const defaultTheme: MindMapTheme = {
  id: 'default',
  themeName: '默认主题',

  rootNodeSize: {
    width: 160,
    height: 60,
  },
  rootNodeStyle: {
    backgroundColor: 'rgb(80, 194, 139)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(80, 194, 139)',
    borderRadius: 3,
    boxShadow: 'none',
  },
  rootNodeEdge: {
    stroke: 'rgb(204, 205, 205)',
    strokeWidth: 2,
    type: ConnectionType.rounded,
  },
  rootNodeContent: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'normal',
  },

  branchNodeSize: {
    width: 100,
    height: 40,
  },
  branchNodeStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 3,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
  },
  branchNodeEdge: {
    stroke: 'rgb(204, 205, 205)',
    strokeWidth: 1,
    type: ConnectionType.orth,
  },
  branchNodeContent: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'normal',
  },

  childNodeSize: {
    width: 70,
    height: 30,
  },
  childNodeStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 3,
    boxShadow: 'none',
  },
  childNodeEdge: {
    stroke: 'rgb(204, 205, 205)',
    strokeWidth: 1,
    type: ConnectionType.orth,
  },
  childNodeContent: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'normal',
  },

  background: {
    color: '#fff',
  },
};
