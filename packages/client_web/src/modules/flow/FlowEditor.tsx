import { createContext, useEffect, useRef, useState } from 'react';
import { Editor } from './Editor';
import Header from './Header';
import styles from './index.module.less';
import SideBar from './SideBar';

interface FlowEditorContextOptions {
  editor?: Editor;
}

export const FlowEditorContext = createContext<FlowEditorContextOptions>({});

export function FlowEditor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor>();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const flowEditor = new Editor({
      container,
    });
    setEditor(flowEditor);
  }, []);

  return (
    <FlowEditorContext.Provider value={{ editor }}>
      <div className={styles.main}>
        <Header />
        <div className={styles.row}>
          <SideBar />
          <div className={styles.canvasContainer}>
            <div className={styles.canvas} ref={canvasRef} />
          </div>
        </div>
      </div>
    </FlowEditorContext.Provider>
  );
}
