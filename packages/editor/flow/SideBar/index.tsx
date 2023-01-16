import { useEffect, useRef, createRef } from 'react';
import { Dnd } from '@antv/x6-plugin-dnd';
import styles from './index.module.less';
import DATA_GROUP from './config';
import Thumbnail from './Thumbnail';
import { useFlowEditor } from '../hooks';
import type { NODE_NAME_ENUM } from '../Editor/nodes';

export default function SideBar() {
  const { editor } = useFlowEditor();
  const dndRef = useRef<Dnd>();
  const dndContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (editor?.graph) {
      const dnd = new Dnd({
        target: editor?.graph,
        dndContainer: dndContainerRef.current!,
      });
      dndRef.current = dnd;
    }
  }, [editor]);
  const starDragHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    shape: NODE_NAME_ENUM,
    config: any,
  ) => {
    const node = editor?.graph.createNode({
      shape,
      ...config,
      width: config.width * 1.5,
      height: config.height * 1.5,
    });
    if (node) {
      dndRef.current?.start(node, e as any);
    }
  };
  return (
    <div className={styles.sideBar} ref={dndContainerRef}>
      {DATA_GROUP.map((group) => {
        return (
          <dl key={group.groupName} className={styles.groupItem}>
            <dt>{group.groupName}</dt>
            <dd>
              {group.children.map((dd) => {
                return (
                  <div
                    key={dd.label}
                    className={styles.item}
                    onMouseDown={(e) => {
                      starDragHandler(e, dd.config.shape, dd.config.option);
                    }}
                  >
                    <Thumbnail shape={dd.config.shape} config={dd.config.option} />
                  </div>
                );
              })}
            </dd>
          </dl>
        );
      })}
    </div>
  );
}
