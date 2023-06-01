import { Dnd } from '@antv/x6-plugin-dnd';
import { createRef, useEffect, useRef } from 'react';
import { useFlowEditor } from '../hooks';
import Thumbnail from './Thumbnail';
import type { GroupChildrenItem } from './config/common';
import DATA_GROUP from './config/index';
import styles from './index.module.less';

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
    item: GroupChildrenItem,
  ) => {
    const type = item.type;
    const shape = item.config.shape;
    const config = item.config.option || ({} as any);
    if (type === 'edge') {
      const edge = editor?.graph.createEdge({
        shape,
        ...config,
      });

      if (edge) {
        // dndRef.current?.start(edge, e as any);
      }
    } else {
      const node = editor?.graph.createNode({
        shape,
        ...config,
        width: config.width! * 1.5,
        height: config.height * 1.5,
      });
      if (node) {
        dndRef.current?.start(node, e as any);
      }
    }
  };
  return (
    <div className={styles.sideBar} ref={dndContainerRef}>
      {DATA_GROUP.map((group) => {
        return (
          <dl key={group.groupName} className={styles.groupItem}>
            {/* <dt>{group.groupName}</dt> */}
            <dd>
              {group.children.map((dd) => {
                return (
                  <div
                    key={dd.label}
                    className={styles.item}
                    onMouseDown={(e) => {
                      starDragHandler(e, dd);
                    }}
                    onClick={(e) => {
                      editor?.appendEdge(dd.config.shape);
                    }}
                    title={dd.label}
                  >
                    <Thumbnail type={dd.type} shape={dd.config.shape} config={dd.config.option} />
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
