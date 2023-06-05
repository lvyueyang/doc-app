import type { Graph, Node } from '@antv/x6';
import { SettingBarGroupItem } from '@kangmi/components';
import { cls } from '@kangmi/utils';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useMindEditor } from '../../hooks';
import { iconGroup } from '../../icons';
import styles from '../index.module.less';

export function IconSetting() {
  const { editor } = useMindEditor();
  const { selectNodes } = useSelectedNodes(editor?.graph);

  const disabled = !selectNodes?.length;

  const clickHandler = (groupName: string, iconName: string, isOnly: boolean) => {
    if (!disabled) {
      selectNodes.forEach((node) => {
        editor?.cellUtils.addIcon(node, groupName, iconName, isOnly);
      });
    }
  };

  return (
    <SettingBarGroupItem label="图标">
      {iconGroup.map((group) => {
        return (
          <div key={group.name}>
            <div className={styles.sectionTitle}>{group.cname}</div>
            <Row
              className={cls([styles.sectionContent, disabled && styles.sectionContentDisabled])}
              gutter={[0, 5]}
            >
              {group.icons.map((item) => {
                return (
                  <Col xs={3} key={item.name}>
                    <span
                      className={styles.iconItem}
                      onClick={() => {
                        clickHandler(group.name, item.name, !!group.isOnly);
                      }}
                    >
                      {item.icon}
                    </span>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </SettingBarGroupItem>
  );
}

function useSelectedNodes(graph?: Graph) {
  const [selectNodes, setSelectNodes] = useState<Node[]>();

  useEffect(() => {
    if (!graph) return;
    const selectedHandler = () => {
      const cells = graph.getSelectedCells();
      setSelectNodes(cells.filter((cell): cell is Node => cell.isNode()));
    };
    selectedHandler();
    let timer: NodeJS.Timeout;
    const selectFn = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        selectedHandler();
      });
    };

    graph.on('selection:changed', selectFn);

    return () => {
      graph.off('selection:changed', selectFn);
    };
  }, [graph]);

  return {
    selectNodes,
  };
}
