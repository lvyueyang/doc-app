import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.module.less';

interface Position {
  x: number;
  y: number;
}

interface Item {
  type?: 'divider';
  key: string;
  label?: string | React.ReactNode;
  icon?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface ShowConfig {
  position: Position;
  items: Item[];
  onClick?: (item: Item) => void;
}

interface ContextMenuOptions {
  rootContainer?: HTMLElement;
}

export class ContextMenu {
  rootContainer: HTMLElement = document.body;
  container!: HTMLElement;
  rootReact!: Root;

  constructor(options?: ContextMenuOptions) {
    if (options?.rootContainer) {
      this.rootContainer = options.rootContainer;
    }
    this.renderContainer();
  }
  show(config: ShowConfig) {
    const { position } = config;
    this.container.style.display = 'block';
    this.setPosition(position.x, position.y);
    this.renderItems(config.items, config.onClick);
  }
  close() {
    this.container.style.display = 'none';
  }
  /** 渲染根容器 */
  private renderContainer() {
    const container = document.createElement('div');
    container.className = 'kangmiContextMenu';
    this.container = container;
    this.rootContainer.appendChild(container);
    this.rootReact = createRoot(container);
  }
  private renderItems(items: Item[], onClick?: (item: Item) => void) {
    this.rootReact.render(<ContextMenuComponent items={items} onClick={onClick} />);
  }

  private setPosition(x: number, y: number) {
    this.container.style.left = x + 'px';
    this.container.style.top = y + 'px';
  }
}

function ContextMenuComponent({
  items,
  onClick,
}: {
  items: Item[];
  onClick?: (item: Item) => void;
}) {
  return (
    <>
      {items.map((item) => {
        if (item.type === 'divider') {
          return <div key={item.key} className="divider" />;
        }
        return (
          <div
            className={['item', item.disabled ? 'disabled' : ''].filter((i) => !!i).join(' ')}
            key={item.key}
            onClick={(e) => {
              e.stopPropagation();
              if (item.disabled) return;
              item.onClick?.(e);
              onClick?.(item);
            }}
            onContextMenu={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="icon">{item.icon}</div>
            <div className="label">{item.label}</div>
            <div className="extra">{item.extra}</div>
          </div>
        );
      })}
    </>
  );
}
