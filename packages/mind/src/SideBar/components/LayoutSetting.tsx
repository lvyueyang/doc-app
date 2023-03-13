import { SettingBarGroupItem } from '@kangmi/components';
import { Button, Row } from 'antd';
import * as LayoutMaps from '../../Editor/layout';
import { useMindEditor } from '../../hooks';

export function LayoutSetting() {
  const { editor } = useMindEditor();

  return (
    <SettingBarGroupItem label="结构布局">
      <Row style={{ padding: '10px 2px' }} gutter={[0, 10]}>
        {Object.values(LayoutMaps).map((item) => {
          return (
            <Button key={item.name} block>
              {item.cname}
            </Button>
          );
        })}
      </Row>
    </SettingBarGroupItem>
  );
}
