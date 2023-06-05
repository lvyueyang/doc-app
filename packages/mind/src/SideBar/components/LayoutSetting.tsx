import { SettingBarGroupItem } from '@kangmi/components';
import { Button, Row } from 'antd';
import { useState } from 'react';
import * as layouts from '../../Editor/layout';
import { useMindEditor } from '../../hooks';

const { MindMapHLayout, ...LayoutMaps } = layouts;

export function LayoutSetting() {
  const { editor } = useMindEditor();
  const [active, setActive] = useState(editor?.layout.getType());

  return (
    <SettingBarGroupItem label="结构布局">
      <Row style={{ padding: '10px 2px' }} gutter={[0, 10]}>
        {Object.entries({ MindMapHLayout, ...LayoutMaps }).map(([key, item]) => {
          return (
            <Button
              type={active === item.name ? 'primary' : 'default'}
              key={key}
              block
              onClick={() => {
                editor?.layout.setLayout(item.name);
                setActive(item.name);
              }}
            >
              {item.cname}
            </Button>
          );
        })}
      </Row>
    </SettingBarGroupItem>
  );
}
