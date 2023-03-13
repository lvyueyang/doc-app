import { SettingBarGroupItem } from '@kangmi/components';
import { Button, Row } from 'antd';
import * as ThemeMaps from '../../Editor/theme';
import { useMindEditor } from '../../hooks';

export function ThemeSetting() {
  const { editor } = useMindEditor();

  return (
    <SettingBarGroupItem label="主题风格">
      <Row style={{ padding: '10px 2px' }} gutter={[0, 10]}>
        {Object.values(ThemeMaps).map((item) => {
          return (
            <Button key={item.themeName} block>
              {item.themeName}
            </Button>
          );
        })}
      </Row>
    </SettingBarGroupItem>
  );
}
