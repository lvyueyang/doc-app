import type { Graph, Node } from '@antv/x6';
import { SettingBarGroupItem } from '@kangmi/components';
import { cls } from '@kangmi/utils';
import { Popover, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import type { TagDataItem, Tags } from '../../Editor/types';
import FormTag from '../../components/FormTag';
import { useMindEditor } from '../../hooks';
import styles from '../index.module.less';

const preTags: Tags = [
  {
    color: '#7a00f2',
    value: '待定',
  },
  {
    color: '#50c28b',
    value: '已确认',
  },
  {
    color: '#008B02',
    value: '已完成',
  },
  {
    color: '#c4c4c4',
    value: '已关闭',
  },
  {
    color: '#2760f2',
    value: '进行中',
  },
];

export function TagSetting() {
  const { editor } = useMindEditor();
  const { selectNodes } = useSelectedNodes(editor?.graph);
  const [addForm, setAddForm] = useState<TagDataItem>({ color: '#1677ff', value: '' });

  const currentTags: Tags = [];
  selectNodes?.forEach((node) => {
    currentTags.push(...(node.data?.tags || []));
  });

  const disabled = !selectNodes?.length;

  const addHandler = (tagItem: TagDataItem) => {
    if (!disabled && tagItem.value) {
      selectNodes.forEach((node) => {
        editor?.addTag(node, tagItem);
      });
    }
  };
  const removeHandler = (value: string) => {
    if (!disabled) {
      selectNodes.forEach((node) => {
        editor?.removeTag(node, value);
      });
    }
  };
  const updateHandler = (oldValue: string, tag: TagDataItem) => {
    if (!disabled) {
      selectNodes.forEach((node) => {
        editor?.updateTag(node, oldValue, tag);
      });
    }
  };

  return (
    <SettingBarGroupItem label="标签">
      <div>
        <div className={styles.sectionTitle}>当前标签</div>
        <Row
          className={cls([styles.sectionContent, disabled && styles.sectionContentDisabled])}
          gutter={[5, 5]}
        >
          {currentTags.map((item) => (
            <Popover
              key={item.value}
              trigger={['click']}
              content={
                <FormTag
                  value={item}
                  onChange={(value) => {
                    updateHandler(item.value, value);
                  }}
                />
              }
            >
              <Tag
                color={item.color}
                closable
                onClose={() => {
                  removeHandler(item.value);
                }}
              >
                {item.value}
              </Tag>
            </Popover>
          ))}
        </Row>
        <div className={styles.sectionTitle}>新建标签</div>
        <FormTag
          value={addForm}
          className={cls([styles.sectionContent, disabled && styles.sectionContentDisabled])}
          onChange={(item) => {
            addHandler(item);
            setAddForm({ ...addForm, value: '' });
          }}
        />
        <div className={styles.sectionTitle}>预置标签</div>
        <Row
          className={cls([styles.sectionContent, disabled && styles.sectionContentDisabled])}
          gutter={[0, 5]}
        >
          {preTags.map((item) => (
            <Tag
              color={item.color}
              key={item.value}
              onClick={() => {
                addHandler(item);
              }}
            >
              {item.value}
            </Tag>
          ))}
        </Row>
      </div>
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
