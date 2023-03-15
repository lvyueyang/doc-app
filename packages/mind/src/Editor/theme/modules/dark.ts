import { merge } from 'lodash';
import type { MindMapTheme } from '../types';
import { defaultTheme } from './default';

export const darkTheme: MindMapTheme = merge({}, defaultTheme, {
  id: 'dark',
  themeName: '暗色主题',

  rootNodeSize: {
    width: 160,
  },

  rootNodeStyle: {
    backgroundColor: '#ff8200',
    borderColor: '#ff8200',
    borderRadius: 25,
  },
  rootNodeEdge: {
    stroke: '#e8eaec',
  },

  branchNodeStyle: {
    backgroundColor: 'rgb(232, 234, 236)',
    borderColor: 'rgb(232, 234, 236)',
    boxShadow: 'none',
  },
  branchNodeEdge: {
    stroke: '#e8eaec',
  },

  childNodeStyle: {
    borderColor: 'rgb(232, 234, 236)',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  childNodeEdge: {
    stroke: '#e8eaec',
  },
  childNodeContent: {
    color: '#fff',
  },

  background: {
    color: 'rgb(57, 60, 65)',
  },
});
