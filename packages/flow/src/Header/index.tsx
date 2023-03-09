import { DownloadOutlined, RollbackOutlined } from '@ant-design/icons';
import { EqualRatio, ZoomIn, ZoomOut } from '@icon-park/react';
import type { TooltipProps } from 'antd';
import { Dropdown, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useFlowEditor } from '../hooks';
import styles from './index.module.less';

export default function Header() {
  const { editor } = useFlowEditor();
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
      <Space size={8}>
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
          title="画布内容充满视口"
          onClick={() => {
            editor.graph?.zoomToFit({ padding: 10 });
          }}
        >
          <EqualRatio />
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
      </Space>
    </div>
  );
}

interface OperateItemProps {
  title: string;
  disabled?: boolean;
  placement?: TooltipProps['placement'];
  onClick?: () => void;
}

function OperateItem({
  children,
  title,
  disabled = false,
  placement,
  onClick,
}: React.PropsWithChildren<OperateItemProps>) {
  return (
    <Tooltip title={title} placement={placement}>
      <div
        className={styles.item}
        data-disabled={disabled}
        onClick={() => {
          if (disabled) return;
          onClick?.();
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
}
