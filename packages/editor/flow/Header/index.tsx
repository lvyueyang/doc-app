import { Dropdown } from 'antd';
import Button from 'antd/es/button';
import { useFlowEditor } from '../hooks';
import styles from './index.module.less';

export default function Header() {
  const { editor } = useFlowEditor();

  if (!editor) return null;

  return (
    <div className={styles.header}>
      <button>撤销</button>
      <button>回退</button>
      <button
        onClick={() => {
          const json = editor.graph.toJSON();
          console.log(JSON.stringify(json));
        }}
      >
        导出 json
      </button>
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <span
                  onClick={() => {
                    editor.graph.exportPNG();
                  }}
                >
                  导出 PNG
                </span>
              ),
              key: 'PNG',
            },
          ],
        }}
      >
        <Button>下载</Button>
      </Dropdown>
    </div>
  );
}
