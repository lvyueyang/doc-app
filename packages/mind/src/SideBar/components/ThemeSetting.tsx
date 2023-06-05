import { SettingBarGroupItem } from '@kangmi/components';
import { Button, Row } from 'antd';
import { useState } from 'react';
import * as themeList from '../../Editor/theme';
import { useMindEditor } from '../../hooks';

const { defaultTheme, ...ThemeMaps } = themeList;

export function ThemeSetting() {
  const { editor } = useMindEditor();
  const [active, setActive] = useState(editor?.theme.getTheme().id);

  return (
    <SettingBarGroupItem label="主题风格">
      <Row style={{ padding: '10px 2px' }} gutter={[0, 10]}>
        {Object.entries({ defaultTheme, ...ThemeMaps }).map(([key, item]) => {
          return (
            <Button
              key={key}
              block
              onClick={() => {
                editor?.theme.setTheme(item);
                setActive(item.id);
              }}
              type={active === item.id ? 'primary' : 'default'}
            >
              {item.themeName}
            </Button>
          );
        })}
      </Row>
    </SettingBarGroupItem>
  );
}
