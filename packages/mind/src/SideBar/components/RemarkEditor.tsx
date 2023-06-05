import type { Graph, Node } from '@antv/x6';
import { SettingBarGroupItem } from '@kangmi/components';
import { useEffect, useState } from 'react';
import type { Tags } from '../../Editor/types';
import Editor from '../../components/Editor';
import { useMindEditor } from '../../hooks';
import styles from './index.module.less';

export function RemarkEditor() {
  const { editor } = useMindEditor();
  const { selectNodes } = useSelectedNodes(editor?.graph);
  const [value, setValue] = useState('');

  const currentTags: Tags = [];
  selectNodes?.forEach((node) => {
    currentTags.push(...(node.data?.tags || []));
  });

  const disabled = selectNodes?.length !== 1;

  const updateHandler = (value: string) => {
    setValue(value);
    if (!disabled) {
      selectNodes.forEach((node) => {
        editor?.cellUtils.updateRemark(node, { value });
      });
    }
  };
  useEffect(() => {
    const remark = selectNodes?.[0]?.getData()?.remark;
    setValue(remark?.value || '');
  }, [selectNodes]);

  return (
    <SettingBarGroupItem label="备注">
      <Editor
        value={value}
        disabled={disabled}
        className={styles.remarkContainer}
        onChange={updateHandler}
      />
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
