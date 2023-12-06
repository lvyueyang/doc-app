import { Portal } from '@antv/x6-react-shape';
import { createContext, useEffect, useRef, useState } from 'react';
import { Editor } from './Editor';
import Header from './Header';
import SideBar from './SideBar';
import styles from './index.module.less';

interface MindEditorContextOptions {
  editor?: Editor;
}

interface MindEditorProps {
  // value?: Model.FromJSONData;
  value?: any;
}

const X6ReactPortalProvider = Portal.getProvider();

export const MindEditorContext = createContext<MindEditorContextOptions>({});

export function MindEditor({ value }: MindEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor>();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const height = window.innerHeight - (containerRef.current?.offsetTop ?? 0);
    const mindEditor = new Editor({
      container,
      height,
    });
    if (value) {
      mindEditor?.fromJSON(value);
      mindEditor?.contentCenter();
    } else {
      mindEditor?.cellUtils.appendRootNode({ isCenter: true });
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
      <X6ReactPortalProvider />
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
