import { useEffect, useState } from 'react';
import type { Cell, Rectangle, Edge, EdgeView, Dom } from '@antv/x6';
import styles from './index.module.less';
import { useFlowEditor } from '../hooks';
import { Button, InputNumber, Select } from 'antd';
import { ColorSelect } from '@kangmi/components';
import type { Editor } from '../Editor';
import { LINE_TYPE } from '../Editor/constants';
import {
  FontStyleButton,
  FontWeightButton,
  HorizontalAlignButtonGroup,
  LineThroughButton,
  UnderlineButton,
  VerticalAlignButtonGroup,
} from './components';

export default function AttrBar() {
  const { editor } = useFlowEditor();
  const { nodeAttrs, edgeAttrs, bBox, selectCells, selectedEdgeLabels, loadAttrs } =
    useSelectedCell(editor);

  const body = nodeAttrs?.body || {};
  const text = nodeAttrs?.label?.style || {};
  const edgeLine = edgeAttrs?.line || {};
  const edgeLabelAttrs = selectedEdgeLabels[0]?.labels?.[0]?.label?.attrs;

  const changeBBoxHandler = ({
    width,
    height,
    x,
    y,
  }: Partial<Pick<Rectangle, 'width' | 'height' | 'x' | 'y'>> = {}) => {
    selectCells?.forEach((cell) => {
      const box = cell.getBBox();
      if (cell.isNode()) {
        cell.setSize({
          width: width || box.width,
          height: height || box.height,
        });
        cell.setPosition({
          x: x || box.x,
          y: y || box.y,
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
  const changeLabelsHandler = (path: string, value: string | number) => {
    selectedEdgeLabels.forEach(({ labels, edge }) => {
      labels.forEach(({ index }) => {
        edge?.setPropByPath(`labels/${index}/attrs/${path}`, value);
      });
    });
  };

  return (
    <div className={styles.attrBar}>
      {nodeAttrs && (
        <>
          <GroupItem label="位置">
            <AttrItem label="x">
              <InputNumber
                value={bBox?.x}
                style={{ width: 100 }}
                min={0}
                onChange={(e) => {
                  changeBBoxHandler({ x: e! });
                }}
              />
            </AttrItem>
            <AttrItem label="Y">
              <InputNumber
                value={bBox?.y}
                style={{ width: 100 }}
                min={0}
                onChange={(e) => {
                  changeBBoxHandler({ y: e! });
                }}
              />
            </AttrItem>
          </GroupItem>
          <GroupItem label="尺寸">
            <AttrItem label="宽度">
              <InputNumber
                value={bBox?.width}
                style={{ width: 100 }}
                min={0}
                onChange={(e) => {
                  changeBBoxHandler({ width: e! });
                }}
              />
            </AttrItem>
            <AttrItem label="高度">
              <InputNumber
                value={bBox?.height}
                style={{ width: 100 }}
                min={0}
                onChange={(e) => {
                  changeBBoxHandler({ height: e! });
                }}
              />
            </AttrItem>
          </GroupItem>
          <GroupItem label="填充">
            <AttrItem label="颜色">
              <ColorSelect
                value={body.fill}
                style={{ width: 100 }}
                onChange={(e) => {
                  changeAttrsHandler('body/fill', e);
                }}
              />
            </AttrItem>
          </GroupItem>
          <GroupItem label="线条">
            <AttrItem label="样式">
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
            </AttrItem>
            <AttrItem label="线宽">
              <InputNumber
                value={body.strokeWidth}
                style={{ width: 100 }}
                min={0}
                step={2}
                onChange={(e) => {
                  changeAttrsHandler('body/strokeWidth', e);
                }}
              />
            </AttrItem>
            <AttrItem label="颜色">
              <ColorSelect
                value={body.stroke}
                style={{ width: 100 }}
                onChange={(e) => {
                  changeAttrsHandler('body/stroke', e);
                }}
              />
            </AttrItem>
          </GroupItem>
          <GroupItem label="文本">
            <AttrItem label="字号">
              <InputNumber
                value={text.fontSize}
                style={{ width: 100 }}
                min={12}
                onChange={(e) => {
                  changeAttrsHandler('label/style/fontSize', e);
                }}
              />
            </AttrItem>
            <AttrItem label="颜色">
              <ColorSelect
                value={text.color}
                style={{ width: 100 }}
                onChange={(e) => {
                  changeAttrsHandler('label/style/color', e);
                }}
              />
            </AttrItem>
            <AttrItem label="字体风格">
              <Button.Group>
                <FontWeightButton
                  value={text.fontWeight}
                  onChange={(e) => {
                    changeAttrsHandler('label/style/fontWeight', e);
                  }}
                />
                <FontStyleButton
                  value={text.fontStyle}
                  onChange={(e) => {
                    changeAttrsHandler('label/style/fontStyle', e);
                  }}
                />
                <UnderlineButton
                  value={text.textDecoration}
                  onChange={(e) => {
                    changeAttrsHandler('label/style/textDecoration', e);
                  }}
                />
                <LineThroughButton
                  value={text.textDecoration}
                  onChange={(e) => {
                    changeAttrsHandler('label/style/textDecoration', e);
                  }}
                />
              </Button.Group>
            </AttrItem>
            <AttrItem label="水平对齐">
              <HorizontalAlignButtonGroup
                value={text.justifyContent}
                onChange={(e) => {
                  changeAttrsHandler('label/style/justifyContent', e!);
                }}
              />
            </AttrItem>
            <AttrItem label="垂直对齐">
              <VerticalAlignButtonGroup
                value={text.alignItems}
                onChange={(e) => {
                  changeAttrsHandler('label/style/alignItems', e!);
                }}
              />
            </AttrItem>
          </GroupItem>
        </>
      )}
      {edgeAttrs && (
        <>
          <GroupItem label="边/连线">
            <AttrItem label="样式">
              <Select
                style={{ width: 100 }}
                value={edgeLine.lineType || LINE_TYPE.SOLID.code}
                onChange={(e) => {
                  changeAttrsHandler('line/lineType', e);
                }}
                options={Object.values(LINE_TYPE).map((item) => ({
                  value: item.code,
                  label: item.cname,
                }))}
              />
            </AttrItem>
            <AttrItem label="线宽">
              <InputNumber
                value={edgeLine.strokeWidth}
                style={{ width: 100 }}
                min={0}
                step={2}
                onChange={(e) => {
                  changeAttrsHandler('line/strokeWidth', e);
                }}
              />
            </AttrItem>
            <AttrItem label="颜色">
              <ColorSelect
                value={edgeLine.stroke}
                style={{ width: 100 }}
                onChange={(e) => {
                  changeAttrsHandler('line/stroke', e);
                }}
              />
            </AttrItem>
          </GroupItem>
          <GroupItem label="文本">
            <AttrItem label="字号">
              <InputNumber
                defaultValue={(edgeLabelAttrs?.label?.fontSize as number) || 12}
                style={{ width: 100 }}
                min={12}
                onChange={(e) => {
                  changeLabelsHandler('label/fontSize', e!);
                }}
              />
            </AttrItem>
            <AttrItem label="颜色">
              <ColorSelect
                defaultValue={(edgeLabelAttrs?.label?.fill as string) || '#000'}
                style={{ width: 100 }}
                onChange={(e) => {
                  changeLabelsHandler('label/fill', e!);
                }}
              />
            </AttrItem>
            <AttrItem label="填充">
              <ColorSelect
                defaultValue={(edgeLabelAttrs?.rect?.fill as string) || '#000'}
                style={{ width: 100 }}
                onChange={(e) => {
                  changeLabelsHandler('rect/fill', e!);
                }}
              />
            </AttrItem>
            <AttrItem label="字体风格">
              <Button.Group>
                <FontWeightButton
                  value={edgeLabelAttrs?.label?.fontWeight as string}
                  onChange={(e) => {
                    changeLabelsHandler('label/fontWeight', e);
                  }}
                />
                <FontStyleButton
                  value={edgeLabelAttrs?.label?.fontStyle as string}
                  onChange={(e) => {
                    changeLabelsHandler('label/fontStyle', e);
                  }}
                />
              </Button.Group>
            </AttrItem>
          </GroupItem>
        </>
      )}
    </div>
  );
}

interface SelectedLabel {
  edge: Edge;
  labels: { label: Edge.Label; index: number }[];
}

function useSelectedCell(editor?: Editor) {
  const [selectCells, setSelectCells] = useState<Cell[]>();
  const [selectedEdgeLabels, setSelectedEdgeLabels] = useState<SelectedLabel[]>([]);
  const [nodeAttrs, setNodeAttrs] = useState<Cell.Properties>();
  const [edgeAttrs, setEdgeAttrs] = useState<Cell.Properties>();
  const [bBox, setBBox] = useState<Rectangle>();

  const loadAttrs = (cells = selectCells) => {
    const node = cells?.find((cell) => cell.isNode());
    const edge = cells?.find((cell) => cell.isEdge());
    setNodeAttrs(node?.getAttrs());
    setBBox(node?.getBBox());
    setEdgeAttrs(edge?.getAttrs());
  };

  useEffect(() => {
    const graph = editor?.graph;
    if (!graph) return;
    const selectedHandler = () => {
      const cells = graph.getSelectedCells();
      setSelectCells(cells);
      setSelectedEdgeLabels(
        cells
          .filter((cell) => cell.isEdge())
          .map((cell) => {
            const edge = cell as Edge;
            const labels = edge.labels.map((label, index) => ({ label, index }));
            return {
              edge,
              labels,
            };
          }),
      );
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
    const edgeClickHandler = (
      args: EdgeView.PositionEventArgs<Dom.ClickEvent<any, any, any, any>>,
    ) => {
      const { e, edge } = args;
      const target = e.target as HTMLElement;
      const parent = target.parentElement;
      if (parent?.classList?.value.includes('x6-edge-label')) {
        setTimeout(() => {
          // 用setTimeout 是为了能覆盖 selected
          const index = Number(parent.getAttribute('data-index') || '0');
          const label = edge.getLabelAt(index);
          if (label) {
            setSelectedEdgeLabels([
              {
                edge,
                labels: [{ label, index }],
              },
            ]);
          }
        });
      }
    };
    graph.on('edge:click', edgeClickHandler);
    graph.on('selection:changed', selectFn);

    return () => {
      graph.off('edge:click', edgeClickHandler);
      graph.off('selection:changed', selectFn);
    };
  }, [editor]);

  return {
    selectCells,
    selectedEdgeLabels,
    nodeAttrs,
    edgeAttrs,
    bBox,
    loadAttrs,
  };
}

function AttrItem({ label, children }: React.PropsWithChildren<{ label?: string }>) {
  return (
    <div className={styles.item}>
      {label && <label>{label}</label>}
      <>{children}</>
    </div>
  );
}

function GroupItem({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <dl className={styles.groupItem}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </dl>
  );
}
