import { createContext, useEffect, useRef, useState } from 'react';
import AttrBar from './AttrBar';
import { Editor } from './Editor';
import Header from './Header';
import SideBar from './SideBar';
import styles from './index.module.less';

interface FlowEditorContextOptions {
  editor?: Editor;
}

interface FlowEditorProps {
  // value?: Model.FromJSONData;
  value?: any;
}

export const FlowEditorContext = createContext<FlowEditorContextOptions>({});

export function FlowEditor({ value }: FlowEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor>();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const flowEditor = new Editor({
      container,
    });
    if (value) {
      flowEditor?.graphData.fromJSON(value);
    }
    setEditor(flowEditor);
  }, []);

  useEffect(() => {
    if (value) {
      editor?.graphData.fromJSON(value);
    }
  }, [value]);

  return (
    <FlowEditorContext.Provider value={{ editor }}>
      <div className={styles.main}>
        <Header />
        <div className={styles.row}>
          <SideBar />
          <div className={styles.canvasContainer}>
            <div className={styles.canvas} ref={canvasRef} />
          </div>
          <AttrBar />
        </div>
      </div>
    </FlowEditorContext.Provider>
  );
}
