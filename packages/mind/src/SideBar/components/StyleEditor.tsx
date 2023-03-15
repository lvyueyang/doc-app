import type { Cell, Graph } from '@antv/x6';
import {
  ColorSelect,
  FontStyleButton,
  FontWeightButton,
  LineThroughButton,
  SettingBarAttrItem,
  SettingBarGroupItem,
  UnderlineButton,
} from '@kangmi/components';
import { Button, InputNumber, Row, Select } from 'antd';
import type { LINE_TYPE_ENUM } from 'Editor/constants';
import { useEffect, useState } from 'react';
import { LINE_TYPE } from '../../constants';
import type { Editor } from '../../Editor';
import { useMindEditor } from '../../hooks';
import styles from './index.module.less';

export function StyleEditor() {
  const { editor } = useMindEditor();
  if (!editor) return null;
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
function PageSettingGroup({ editor }: { editor: Editor }) {
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

function NodeSettingGroup({ editor }: { editor: Editor }) {
  const graph = editor?.graph;
  const { nodeAttrs, selectCells } = useSelectedCell(graph);
  const nodeStyle = (nodeAttrs?.box?.style as React.CSSProperties) || {};
  console.log('nodeStyle: ', nodeStyle);

  const changeAttrsHandler = (path: string, value: string | number) => {
    selectCells?.forEach((cell) => {
      cell.setAttrByPath(path, value);
    });
  };

  if (!selectCells?.length) return null;
  return (
    <SettingBarGroupItem label="节点">
      <SettingBarAttrItem label="边框颜色">
        <ColorSelect
          value={nodeStyle.borderColor}
          onChange={(e) => {
            changeAttrsHandler('box/style/borderColor', e);
          }}
        />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="边框宽度">
        <InputNumber
          value={nodeStyle.borderWidth}
          onChange={(e) => {
            changeAttrsHandler('box/style/borderWidth', e || 0);
          }}
        />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="边框风格">
        <Select
          value={nodeStyle.borderStyle || LINE_TYPE.SOLID}
          options={Object.values(LINE_TYPE).map((item) => ({
            value: item.code,
            label: item.cname,
          }))}
          onChange={(e) => {
            changeAttrsHandler('box/style/borderStyle', e as LINE_TYPE_ENUM);
          }}
        />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="填充">
        <ColorSelect
          value={nodeStyle.backgroundColor || '#fff'}
          onChange={(e) => {
            changeAttrsHandler('box/style/backgroundColor', e);
          }}
        />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="圆角">
        <InputNumber
          value={nodeStyle.borderRadius || 0}
          onChange={(e) => {
            changeAttrsHandler('box/style/borderRadius', e || 0);
          }}
        />
      </SettingBarAttrItem>
    </SettingBarGroupItem>
  );
}

function TextSettingGroup({ editor }: { editor: Editor }) {
  const graph = editor?.graph;
  const { nodeAttrs, selectCells } = useSelectedCell(graph);
  const labelStyle = (nodeAttrs?.label?.style as React.CSSProperties) || {};

  const changeAttrsHandler = (path: string, value: string | number) => {
    selectCells?.forEach((cell) => {
      cell.setAttrByPath(path, value);
    });
  };

  if (!selectCells?.length) return null;

  return (
    <SettingBarGroupItem label="文本">
      <SettingBarAttrItem label="文字颜色">
        <ColorSelect
          value={labelStyle.color}
          onChange={(e) => {
            changeAttrsHandler('label/style/color', e);
          }}
        />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="文字大小">
        <InputNumber
          value={labelStyle.fontSize}
          onChange={(e) => {
            changeAttrsHandler('label/style/fontSize', e || 12);
          }}
        />
      </SettingBarAttrItem>
      <SettingBarAttrItem label="字体风格">
        <Button.Group>
          <FontWeightButton
            value={labelStyle.fontWeight as string}
            onChange={(e) => {
              changeAttrsHandler('label/style/fontWeight', e);
            }}
          />
          <FontStyleButton
            value={labelStyle.fontStyle}
            onChange={(e) => {
              changeAttrsHandler('label/style/fontStyle', e);
            }}
          />
          <UnderlineButton
            value={labelStyle.textDecoration as string}
            onChange={(e) => {
              changeAttrsHandler('label/style/textDecoration', e);
            }}
          />
          <LineThroughButton
            value={labelStyle.textDecoration as string}
            onChange={(e) => {
              changeAttrsHandler('label/style/textDecoration', e);
            }}
          />
        </Button.Group>
      </SettingBarAttrItem>
    </SettingBarGroupItem>
  );
}

const preStyles = [
  {
    title: '重点',
    style: {
      node: {
        backgroundColor: '#e95b56',
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
        backgroundColor: '#edaf41',
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
        backgroundColor: '#75c13f',
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
        backgroundColor: '#488ff7',
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
        backgroundColor: '#bbb',
        borderColor: '#bbb',
      },
      content: {
        color: '#fff',
        textDecoration: 'line-through',
      },
    },
  },
  {
    title: '次要',
    style: {
      node: {
        backgroundColor: '#fff',
        borderColor: '#edaf41',
      },
      content: {
        color: '#edaf41',
      },
    },
  },
];

function PresetNodeStyle({ editor }: { editor: Editor }) {
  const graph = editor?.graph;
  const { selectCells } = useSelectedCell(graph);

  const changeAttrsHandler = (path: string, value: any) => {
    selectCells?.forEach((cell) => {
      cell.setAttrByPath(path, value);
    });
  };

  if (!selectCells?.length) return null;
  return (
    <SettingBarGroupItem label="预置主题风格">
      <Row justify="space-between" style={{ padding: '10px 0 2px' }}>
        {preStyles.map((item) => {
          return (
            <div
              className={styles.presetItem}
              key={item.title}
              style={{
                background: item.style.node.backgroundColor,
                borderColor: item.style.node.borderColor,
                color: item.style.content.color,
              }}
              onClick={() => {
                changeAttrsHandler('box/style', item.style.node);
                changeAttrsHandler('label/style', item.style.content);
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

function useSelectedCell(graph: Graph) {
  const [selectCells, setSelectCells] = useState<Cell[]>();
  const [nodeAttrs, setNodeAttrs] = useState<Cell.Properties>();
  const [edgeAttrs, setEdgeAttrs] = useState<Cell.Properties>();

  const loadAttrs = (list: Cell[]) => {
    const cells = list || graph.getSelectedCells();
    const node = cells?.find((cell) => cell.isNode());
    const edge = cells?.find((cell) => cell.isEdge());
    setNodeAttrs(node?.getAttrs());
    setEdgeAttrs(edge?.getAttrs());
  };

  useEffect(() => {
    if (!graph) return;
    const selectedHandler = () => {
      const cells = graph.getSelectedCells();
      setSelectCells(cells);
      loadAttrs(cells);
    };
    selectedHandler();
    let timer: NodeJS.Timeout;
    const selectFn = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        selectedHandler();
      });
    };

    const reloadSelectedCellAttrs = (e: any) => {
      if (e.key === 'ports') return;
      const selectedCells = graph.getSelectedCells();
      if (selectedCells?.length) {
        loadAttrs(selectedCells);
      }
    };

    graph.on('selection:changed', selectFn);
    graph.on('cell:change:*', reloadSelectedCellAttrs);

    return () => {
      graph.off('selection:changed', selectFn);
      graph.on('cell:change:*', reloadSelectedCellAttrs);
    };
  }, [graph]);

  return {
    selectCells,
    nodeAttrs,
    edgeAttrs,
  };
}
