import { DownloadOutlined, RollbackOutlined } from '@ant-design/icons';
import { Aiming, ZoomIn, ZoomOut } from '@icon-park/react';
import type { TooltipProps } from 'antd';
import { Dropdown, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useMindEditor } from '../hooks';
import styles from './index.module.less';

export default function Header() {
  const { editor } = useMindEditor();
  const [canOperate, setCanOperate] = useState({
    canUndo: false,
    canRedo: false,
    canZoom: false,
  });

  const updateOperateHandler = () => {
    if (!editor) return;
    const graph = editor.graph;
    setCanOperate((state) => ({
      ...state,
      canRedo: graph.canRedo(),
      canUndo: graph.canUndo(),
    }));
  };

  useEffect(() => {
    if (!editor) return;
    const graph = editor.graph;
    updateOperateHandler();
    graph.on('history:change', updateOperateHandler);
    return () => {
      graph.off('history:change', updateOperateHandler);
    };
  }, [editor]);

  const getFileName = () => {
    return `flow-${Date.now()}`;
  };

  if (!editor?.graph) return null;

  return (
    <div className={styles.header}>
      <div className={styles.wrap}>
        <OperateItem
          title="撤销 (ctrl+z)"
          disabled={!canOperate.canUndo}
          onClick={() => {
            editor.graph?.undo();
          }}
        >
          <RollbackOutlined />
        </OperateItem>
        <OperateItem
          title="恢复 (ctrl+shift+z)"
          disabled={!canOperate.canRedo}
          onClick={() => {
            editor.graph?.redo();
          }}
        >
          <RollbackOutlined style={{ transform: 'rotateY(180deg)' }} />
        </OperateItem>
        <OperateItem
          title="放大 (空格 + 鼠标滚轮)"
          onClick={() => {
            editor.graph?.zoom(0.1);
          }}
        >
          <ZoomIn />
        </OperateItem>
        <OperateItem
          title="缩小 (空格 + 鼠标滚轮)"
          onClick={() => {
            editor.graph?.zoom(-0.1);
          }}
        >
          <ZoomOut />
        </OperateItem>
        <OperateItem
          title="定位到中心主题"
          onClick={() => {
            editor.contentCenter();
          }}
        >
          <Aiming />
        </OperateItem>
        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              {
                label: '导出 JSON 文件',
                key: 'JSON',
                onClick: editor.exportJSON,
              },
              {
                label: '导出 PNG 文件',
                key: 'PNG',
                onClick: () => {
                  editor.exportPNG();
                },
              },
              {
                label: '导出 PNG 文件 (透明背景)',
                key: 'PNG-TRANSPARENT',
                onClick: () => {
                  editor.exportPNG(true);
                },
              },
              {
                label: '导出 JPEG 文件',
                key: 'JPEG',
                onClick: () => {
                  editor.exportJPEG();
                },
              },
              {
                label: '导出 SVG 文件',
                key: 'SVG',
                onClick: editor.exportSVG,
              },
            ],
          }}
        >
          <OperateItem title="导出文件" placement="right">
            <DownloadOutlined />
          </OperateItem>
        </Dropdown>
        <OperateItem
          title=""
          onClick={() => {
            console.log(editor.toJson().data.cells);
          }}
        >
          JSON
        </OperateItem>
      </div>
    </div>
  );
}

interface OperateItemProps {
  title: string;
  disabled?: boolean;
  placement?: TooltipProps['placement'];
  className?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function OperateItem({
  children,
  title,
  disabled = false,
  placement,
  className,
  active,
  onClick,
}: React.PropsWithChildren<OperateItemProps>) {
  return (
    <Tooltip title={title} placement={placement}>
      <div
        className={[styles.item, className, active ? styles.active : '']
          .filter((i) => !!i)
          .join(' ')}
        data-disabled={disabled}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
}
