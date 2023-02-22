import { useEffect, useState } from 'react';
import type { Cell, Rectangle } from '@antv/x6';
import styles from './index.module.less';
import { useFlowEditor } from '../hooks';
import { Button, Empty, InputNumber, Radio, Row, Select } from 'antd';
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
  const { visible, attrs, bBox, selectCells, loadAttrs } = useVisible(editor);

  const body = attrs?.body || {};
  const text = attrs?.label?.style || {};

  const changeBBoxHandler = ({
    width,
    height,
    x,
    y,
  }: Partial<Pick<Rectangle, 'width' | 'height' | 'x' | 'y'>> = {}) => {
    if (!bBox) return;
    selectCells?.forEach((cell) => {
      if (cell.isNode()) {
        cell.setSize({
          width: width || bBox.width,
          height: height || bBox.height,
        });
        cell.setPosition({
          x: x || bBox.x,
          y: y || bBox.y,
        });
      }
    });
    loadAttrs();
  };
  const changeAttrsHandler = (path: string, value: string) => {
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
            <dt>位置</dt>
            <dd>
              <Row className={styles.item}>
                <label>X</label>
                <InputNumber
                  value={bBox?.x}
                  style={{ width: 100 }}
                  min={0}
                  onChange={(e) => {
                    changeBBoxHandler({ x: e! });
                  }}
                />
              </Row>
              <Row className={styles.item}>
                <label>Y</label>
                <InputNumber
                  value={bBox?.y}
                  style={{ width: 100 }}
                  min={0}
                  onChange={(e) => {
                    changeBBoxHandler({ y: e! });
                  }}
                />
              </Row>
            </dd>
          </dl>
          <dl className={styles.groupItem}>
            <dt>尺寸</dt>
            <dd>
              <Row className={styles.item}>
                <label>宽度</label>
                <InputNumber
                  value={bBox?.width}
                  style={{ width: 100 }}
                  min={0}
                  onChange={(e) => {
                    changeBBoxHandler({ width: e! });
                  }}
                />
              </Row>
              <Row className={styles.item}>
                <label>高度</label>
                <InputNumber
                  value={bBox?.height}
                  style={{ width: 100 }}
                  min={0}
                  onChange={(e) => {
                    changeBBoxHandler({ height: e! });
                  }}
                />
              </Row>
            </dd>
          </dl>
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
                    changeAttrsHandler('body/fill', fill);
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
                    changeAttrsHandler('body/lineType', e);
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
                    changeAttrsHandler('body/strokeWidth', e);
                  }}
                />
              </div>
              <div className={styles.item}>
                <label>颜色</label>
                <ColorSelect
                  value={body.stroke}
                  style={{ width: 100 }}
                  onChange={(e) => {
                    changeAttrsHandler('body/stroke', e.target.value);
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
                <InputNumber
                  value={text.fontSize || DefaultNodeConfig.fontSize}
                  style={{ width: 100 }}
                  onChange={(e) => {
                    changeAttrsHandler('label/style/fontSize', e);
                  }}
                />
              </div>
              <div className={styles.item}>
                <label>颜色</label>
                <ColorSelect
                  value={text.color || DefaultNodeConfig.fontColor}
                  style={{ width: 100 }}
                  onChange={(e) => {
                    changeAttrsHandler('label/style/color', e.target.value);
                  }}
                />
              </div>
              <div className={styles.item}>
                <label>字体风格</label>
                <Button.Group>
                  <Button
                    icon={<BoldOutlined />}
                    type={text.fontWeight === 'bold' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler(
                        'label/style/fontWeight',
                        text.fontWeight === 'bold' ? '' : 'bold',
                      );
                    }}
                  />
                  <Button
                    icon={<ItalicOutlined />}
                    type={text.fontStyle === 'italic' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler(
                        'label/style/fontStyle',
                        text.fontStyle === 'italic' ? '' : 'italic',
                      );
                    }}
                  />
                  <Button
                    icon={<UnderlineOutlined />}
                    type={text.textDecoration === 'underline' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler(
                        'label/style/textDecoration',
                        text.textDecoration === 'underline' ? '' : 'underline',
                      );
                    }}
                  />
                  <Button
                    icon={<StrikethroughOutlined />}
                    type={text.textDecoration === 'line-through' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler(
                        'label/style/textDecoration',
                        text.textDecoration === 'line-through' ? '' : 'line-through',
                      );
                    }}
                  />
                </Button.Group>
              </div>
              <div className={styles.item}>
                <label>水平对齐</label>
                <Button.Group>
                  <Button
                    icon={<AlignLeftOutlined />}
                    type={text.justifyContent === 'start' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler('label/style/justifyContent', 'start');
                    }}
                  />
                  <Button
                    icon={<AlignCenterOutlined />}
                    type={text.justifyContent === 'center' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler('label/style/justifyContent', 'center');
                    }}
                  />
                  <Button
                    icon={<AlignRightOutlined />}
                    type={text.justifyContent === 'end' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler('label/style/justifyContent', 'end');
                    }}
                  />
                </Button.Group>
              </div>
              <div className={styles.item}>
                <label>垂直对齐</label>
                <Button.Group>
                  <Button
                    icon={<VerticalAlignTopOutlined />}
                    type={text.alignItems === 'flex-start' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler('label/style/alignItems', 'flex-start');
                    }}
                  />
                  <Button
                    icon={<VerticalAlignMiddleOutlined />}
                    type={text.alignItems === 'center' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler('label/style/alignItems', 'center');
                    }}
                  />
                  <Button
                    icon={<VerticalAlignBottomOutlined />}
                    type={text.alignItems === 'flex-end' ? 'primary' : 'default'}
                    onClick={() => {
                      changeAttrsHandler('label/style/alignItems', 'flex-end');
                    }}
                  />
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
  const [bBox, setBBox] = useState<Rectangle>();

  const loadAttrs = (cells = selectCells) => {
    const node = cells?.find((cell) => cell.isNode());
    if (node) {
      setAttrs(node.getAttrs());
      setBBox(node.getBBox());
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
    bBox,
    loadAttrs,
    setVisible,
  };
}
