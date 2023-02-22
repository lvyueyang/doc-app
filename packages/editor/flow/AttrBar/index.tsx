import { useEffect, useState } from 'react';
import type { Cell, Node } from '@antv/x6';
import styles from './index.module.less';
import { useFlowEditor } from '../hooks';
import { Button, Empty, InputNumber, Row, Select, Space } from 'antd';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import ColorSelect from '../../components/ColorSelect';
import type { Editor } from '../Editor';
import { DefaultNodeConfig, LINE_TYPE } from '../nodes/constants';

export default function AttrBar() {
  const { editor } = useFlowEditor();
  const { visible, attrs, selectCells, loadAttrs } = useVisible(editor);

  const body = attrs?.body || {};
  const text = attrs?.text || {};
  console.log('body: ', attrs);

  const changeHandler = (path: string, value: string) => {
    selectCells?.forEach((cell) => {
      cell.setAttrByPath(path, value);
    });
    loadAttrs();
  };

  return (
    <div className={styles.attrBar}>
      {visible && (
        <>
          <dl className={styles.groupItem}>
            <dt>填充</dt>
            <dd>
              <Row className={styles.item}>
                <label>颜色</label>
                <ColorSelect
                  value={body.fill}
                  style={{ width: 100 }}
                  onChange={(e) => {
                    const fill = e.target.value;
                    changeHandler('body/fill', fill);
                  }}
                />
              </Row>
            </dd>
          </dl>
          <dl className={styles.groupItem}>
            <dt>线条</dt>
            <dd>
              <div className={styles.item}>
                <label>样式</label>
                <Select
                  style={{ width: 100 }}
                  value={body.lineType || LINE_TYPE.SOLID.code}
                  onChange={(e) => {
                    changeHandler('body/lineType', e);
                  }}
                  options={Object.values(LINE_TYPE).map((item) => ({
                    value: item.code,
                    label: item.cname,
                  }))}
                />
              </div>
              <div className={styles.item}>
                <label>线宽</label>
                <InputNumber
                  value={body.strokeWidth}
                  style={{ width: 100 }}
                  min={0}
                  step={2}
                  onChange={(e) => {
                    changeHandler('body/strokeWidth', e);
                  }}
                />
              </div>
              <div className={styles.item}>
                <label>颜色</label>
                <ColorSelect
                  value={body.stroke}
                  style={{ width: 100 }}
                  onChange={(e) => {
                    changeHandler('body/stroke', e.target.value);
                  }}
                />
              </div>
            </dd>
          </dl>
          <dl className={styles.groupItem}>
            <dt>文本</dt>
            <dd>
              <div className={styles.item}>
                <label>字号</label>
                <InputNumber value={text.fontSize} style={{ width: 100 }} />
              </div>
              <div className={styles.item}>
                <label>颜色</label>
                <ColorSelect value={text.fill} style={{ width: 100 }} />
              </div>
              <div className={styles.item}>
                <label>字体风格</label>
                <Button.Group>
                  <Button icon={<BoldOutlined />} />
                  <Button icon={<ItalicOutlined />} />
                  <Button icon={<UnderlineOutlined />} />
                  <Button icon={<StrikethroughOutlined />} />
                </Button.Group>
              </div>
              <div className={styles.item}>
                <label>水平对齐</label>
                <Button.Group>
                  <Button icon={<AlignLeftOutlined />} />
                  <Button icon={<AlignCenterOutlined />} />
                  <Button icon={<AlignRightOutlined />} />
                </Button.Group>
              </div>
              <div className={styles.item}>
                <label>垂直对齐</label>
                <Button.Group>
                  <Button icon={<VerticalAlignTopOutlined />} />
                  <Button icon={<VerticalAlignMiddleOutlined />} />
                  <Button icon={<VerticalAlignBottomOutlined />} />
                </Button.Group>
              </div>
            </dd>
          </dl>
        </>
      )}
    </div>
  );
}

function useVisible(editor?: Editor) {
  const [visible, setVisible] = useState(false);
  const [selectCells, setSelectCells] = useState<Cell[]>();
  const [attrs, setAttrs] = useState<Cell.Properties>();

  const loadAttrs = (cells = selectCells) => {
    const node = cells?.find((cell) => cell.isNode());
    if (node) {
      setAttrs(node.getAttrs());
    }
  };

  useEffect(() => {
    const graph = editor?.graph;
    if (!graph) return;
    const selectedHandler = () => {
      const cells = graph.getSelectedCells();
      setVisible(!!cells.length);
      setSelectCells(cells);
      loadAttrs(cells);
      const node = cells.find((cell) => cell.isNode());
      if (node) {
        setAttrs(node.getAttrs());
      }
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
  }, [editor]);

  return {
    visible,
    selectCells,
    attrs,
    loadAttrs,
    setVisible,
  };
}
