import * as mindMapTheme from '../theme';
import type { MindMapTheme } from '../theme/types';
import { shape2Theme } from '../utils';
import { BaseModule } from './BaseModule';

export class Theme extends BaseModule {
  /** 主题 */
  private config: MindMapTheme = mindMapTheme.defaultTheme;

  /** 获取主题配置 */
  getTheme() {
    return this.config;
  }

  /** 更换主题 */
  setTheme(theme?: MindMapTheme) {
    if (!theme) return;
    this.config = theme;
    const cells = this.graph.getCells();
    cells.forEach((cell) => {
      if (cell.isNode()) {
        const shape = cell.shape;
        cell.setAttrs({
          box: {
            style: { ...shape2Theme(shape, theme)?.node },
          },
          label: {
            style: { ...shape2Theme(shape, theme)?.content },
          },
        });
      }
      if (cell.isEdge()) {
        const shape = cell.getTargetCell()?.shape;
        if (shape) {
          cell.setAttrs({
            line: {
              ...shape2Theme(shape, theme)?.edge,
            },
          });
        }
      }
    });
    this.graph.drawBackground({
      color: theme.background.color,
    });
    this.editor.emit('change:theme', theme);
  }

  /** 获取背景 */
  getBackground = () => {
    const dom = this.graph.container.parentElement!.querySelector('.x6-graph-scroller-background');
    const style = getComputedStyle(dom!);
    const result = {
      color: style.backgroundColor,
      image: style.backgroundImage,
    };
    return result;
  };
}

export interface ThemeEventTypes {
  'change:theme': (theme: MindMapTheme) => void;
}
