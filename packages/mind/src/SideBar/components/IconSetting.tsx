import type { Node } from '@antv/x6';
import { SettingBarGroupItem } from '@kangmi/components';
import { Col, Row } from 'antd';
import { useMindEditor } from '../../hooks';
import { iconGroup } from '../../icons';
import styles from '../index.module.less';

export function IconSetting() {
  const { editor } = useMindEditor();

  const clickHandler = (groupName: string, iconName: string, isOnly: boolean) => {
    const selectNodes = editor?.graph.getSelectedCells().filter((c) => c.isNode()) as Node[];
    if (selectNodes?.length) {
      selectNodes.forEach((node) => {
        editor?.addIcon(node, groupName, iconName, isOnly);
      });
    }
  };

  return (
    <SettingBarGroupItem label="图标">
      {iconGroup.map((group) => {
        return (
          <div key={group.name}>
            <div className={styles.sectionTitle}>{group.cname}</div>
            <Row className={styles.sectionContent} gutter={[0, 5]}>
              {group.icons.map((item) => {
                return (
                  <Col xs={3} key={item.name}>
                    <span
                      style={{ fontSize: 24, cursor: 'pointer' }}
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
