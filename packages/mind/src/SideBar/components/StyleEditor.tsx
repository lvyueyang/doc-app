import {
  ColorSelect,
  FontStyleButton,
  FontWeightButton,
  HorizontalAlignButtonGroup,
  LineThroughButton,
  SettingBarAttrItem,
  SettingBarGroupItem,
  UnderlineButton,
  VerticalAlignButtonGroup,
} from '@kangmi/components';
import { Button, InputNumber, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { LINE_TYPE } from '../../constants';
import type { Editor } from '../../Editor';
import { useMindEditor } from '../../hooks';
import styles from './index.module.less';

export function StyleEditor() {
  const { editor } = useMindEditor();

  return (
    <>
      <PageSettingGroup editor={editor} />
      <NodeSettingGroup editor={editor} />
      <TextSettingGroup editor={editor} />
      <PresetNodeStyle editor={editor} />
    </>
  );
}

interface PageConfigState {
  background: {
    color: string;
  };
}
function PageSettingGroup({ editor }: { editor?: Editor }) {
  const graph = editor?.graph;
  const [pageConfig, setPageConfig] = useState<PageConfigState>({
    background: {
      color: '#fff',
    },
  });
  const updatePageConfig = () => {
    if (graph) {
      setPageConfig({
        background: {
          color: editor.getBackground().color,
        },
      });
    }
  };
  useEffect(() => {
    updatePageConfig();
  }, []);
  return (
    <SettingBarGroupItem label="页面配置">
      <SettingBarAttrItem label="背景颜色">
        <ColorSelect
          value={pageConfig.background.color}
          onChange={(e) => {
            graph?.drawBackground({ color: e });
            updatePageConfig();
          }}
        />
      </SettingBarAttrItem>
    </SettingBarGroupItem>
  );
}

function NodeSettingGroup({ editor }: { editor?: Editor }) {
  const graph = editor?.graph;

  return (
    <SettingBarGroupItem label="节点">
      <SettingBarAttrItem label="边框颜色">
        <ColorSelect />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="边框宽度">
        <InputNumber />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="边框风格">
        <Select
          options={Object.values(LINE_TYPE).map((item) => ({
            value: item.code,
            label: item.cname,
          }))}
        />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="填充">
        <ColorSelect />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="圆角">
        <InputNumber />
      </SettingBarAttrItem>
    </SettingBarGroupItem>
  );
}

function TextSettingGroup({ editor }: { editor?: Editor }) {
  const graph = editor?.graph;

  return (
    <SettingBarGroupItem label="文本">
      <SettingBarAttrItem label="文字颜色">
        <ColorSelect />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="文字大小">
        <InputNumber />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="字体风格">
        <Button.Group>
          <FontWeightButton />
          <FontStyleButton />
          <UnderlineButton />
          <LineThroughButton />
        </Button.Group>
      </SettingBarAttrItem>
      <SettingBarAttrItem label="水平对齐">
        <HorizontalAlignButtonGroup />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="垂直对齐">
        <VerticalAlignButtonGroup />
      </SettingBarAttrItem>
    </SettingBarGroupItem>
  );
}

const preStyles = [
  {
    title: '重点',
    style: {
      node: {
        background: '#e95b56',
        borderColor: '#e95b56',
      },
      content: {
        color: '#fff',
      },
    },
  },
  {
    title: '待定',
    style: {
      node: {
        background: '#edaf41',
        borderColor: '#edaf41',
      },
      content: {
        color: '#fff',
      },
    },
  },
  {
    title: '完成',
    style: {
      node: {
        background: '#75c13f',
        borderColor: '#75c13f',
      },
      content: {
        color: '#fff',
      },
    },
  },
  {
    title: '突出',
    style: {
      node: {
        background: '#488ff7',
        borderColor: '#488ff7',
      },
      content: {
        color: '#fff',
      },
    },
  },
  {
    title: '删除',
    style: {
      node: {
        background: '#999',
        borderColor: '#999',
      },
      content: {
        color: '#fff',
      },
    },
  },
  {
    title: '次要',
    style: {
      node: {
        background: '#fff',
        borderColor: '#edaf41',
      },
      content: {
        color: '#edaf41',
      },
    },
  },
];
function PresetNodeStyle({ editor }: { editor?: Editor }) {
  return (
    <SettingBarGroupItem label="预置主题风格">
      <Row justify="space-between" style={{ padding: '10px 0 2px' }}>
        {preStyles.map((item) => {
          return (
            <div
              className={styles.presetItem}
              key={item.title}
              style={{
                background: item.style.node.background,
                borderColor: item.style.node.borderColor,
                color: item.style.content.color,
              }}
            >
              {item.title}
            </div>
          );
        })}
      </Row>
    </SettingBarGroupItem>
  );
}
