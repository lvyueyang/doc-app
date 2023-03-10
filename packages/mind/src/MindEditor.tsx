import { createContext, useEffect, useRef, useState } from 'react';
import { Editor } from './Editor';
import Header from './Header';
import styles from './index.module.less';
import SideBar from './SideBar';

interface MindEditorContextOptions {
  editor?: Editor;
}

interface MindEditorProps {
  // value?: Model.FromJSONData;
  value?: any;
}

export const MindEditorContext = createContext<MindEditorContextOptions>({});

export function MindEditor({ value }: MindEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor>();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const height = window.innerHeight - (containerRef.current?.offsetTop || 0);
    const mindEditor = new Editor({
      container,
      height,
    });
    if (value) {
      mindEditor?.fromJSON(value);
    } else {
      mindEditor?.appendRootNode({ isCenter: true });
    }
    setEditor(mindEditor);
  }, []);

  useEffect(() => {
    if (value) {
      editor?.fromJSON(value);
    }
  }, [value]);

  return (
    <MindEditorContext.Provider value={{ editor }}>
      <div className={styles.main}>
        <Header />
        <div className={styles.canvasContainer} ref={containerRef}>
          <div className={styles.canvas} ref={canvasRef} />
        </div>
        <SideBar />
      </div>
    </MindEditorContext.Provider>
  );
}
