import { useEffect, useState } from 'react';
import type { Cell, Rectangle, Edge, EdgeView, Dom, Graph } from '@antv/x6';
import styles from './index.module.less';
import { useFlowEditor } from '../hooks';
import { Button, InputNumber, Select, Switch } from 'antd';
import { ColorSelect } from '@kangmi/components';
import { LINE_TYPE } from '../Editor/constants';
import {
  FontStyleButton,
  FontWeightButton,
  HorizontalAlignButtonGroup,
  LineThroughButton,
  UnderlineButton,
  VerticalAlignButtonGroup,
} from './components';
import type { Editor } from '../Editor';

interface SelectedLabel {
  edge: Edge;
  labels: { label: Edge.Label; index: number }[];
}

interface PageConfigState {
  background: {
    color: string;
  };
  grid: {
    size: number;
    visible: boolean;
  };
}

export default function AttrBar() {
  const { editor } = useFlowEditor();
  const graph = editor?.graph;

  if (!graph) return null;

  return (
    <div className={styles.attrBar}>
      <PageSettingGroup graph={graph} editor={editor} />
      <NodeSettingGroup graph={graph} />
      <EdgeSettingGroup graph={graph} />
    </div>
  );
}

function PageSettingGroup({ graph, editor }: { graph: Graph; editor: Editor }) {
  const [pageConfig, setPageConfig] = useState<PageConfigState>({
    background: {
      color: '#fff',
    },
    grid: {
      size: 10,
      visible: true,
    },
  });
  const updatePageConfig = () => {
    if (graph) {
      setPageConfig({
        background: {
          color: editor.getBackground().color,
        },
        grid: {
          size: graph.getGridSize(),
          visible: graph.options.grid.visible,
        },
      });
    }
  };
  useEffect(() => {
    updatePageConfig();
  }, []);
  return (
    <GroupItem label="页面配置">
      <AttrItem label="背景颜色">
        <ColorSelect
          value={pageConfig.background.color}
          style={{ width: 100 }}
          onChange={(e) => {
            graph?.drawBackground({ color: e });
            updatePageConfig();
          }}
        />
      </AttrItem>
      <AttrItem label="显示网格">
        <Switch
          checked={pageConfig.grid.visible}
          onChange={(e) => {
            if (e) {
              graph?.showGrid();
            } else {
              graph?.hideGrid();
            }
            updatePageConfig();
          }}
        />
      </AttrItem>
      <AttrItem label="网格尺寸">
        <InputNumber
          value={pageConfig.grid.size}
          style={{ width: 100 }}
          min={0}
          onChange={(e) => {
            if (e) {
              graph?.setGridSize(e);
              updatePageConfig();
            }
          }}
        />
      </AttrItem>
    </GroupItem>
  );
}

function NodeSettingGroup({ graph }: { graph: Graph }) {
  const { nodeAttrs, bBox, selectCells } = useSelectedCell(graph);

  const body = nodeAttrs?.body || {};
  const text = nodeAttrs?.label?.style || {};

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
  };
  const changeAttrsHandler = (path: string, value: string) => {
    selectCells?.forEach((cell) => {
      cell.setAttrByPath(path, value);
    });
  };

  if (!nodeAttrs) return null;

  return (
    <>
      <GroupItem label="节点位置">
        <AttrItem label="x">
          <InputNumber
            value={bBox?.x}
            disabled={(selectCells?.length || 0) > 1}
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
            disabled={(selectCells?.length || 0) > 1}
            min={0}
            onChange={(e) => {
              changeBBoxHandler({ y: e! });
            }}
          />
        </AttrItem>
      </GroupItem>
      <GroupItem label="节点尺寸">
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
      <GroupItem label="节点填充">
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
      <GroupItem label="节点线条">
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
      <GroupItem label="节点文本">
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
            value={text.alignItems}
            onChange={(e) => {
              changeAttrsHandler('label/style/alignItems', e!);
            }}
          />
        </AttrItem>
        <AttrItem label="垂直对齐">
          <VerticalAlignButtonGroup
            value={text.justifyContent}
            onChange={(e) => {
              changeAttrsHandler('label/style/justifyContent', e!);
            }}
          />
        </AttrItem>
      </GroupItem>
    </>
  );
}

function EdgeSettingGroup({ graph }: { graph: Graph }) {
  const { edgeAttrs, selectCells, selectedEdgeLabels } = useSelectedCell(graph);

  const edgeLine = edgeAttrs?.line || {};
  const edgeLabelAttrs = selectedEdgeLabels[0]?.labels?.[0]?.label?.attrs;

  const changeAttrsHandler = (path: string, value: string) => {
    selectCells?.forEach((cell) => {
      cell.setAttrByPath(path, value);
    });
  };
  const changeLabelsHandler = (path: string, value: string | number) => {
    selectedEdgeLabels.forEach(({ labels, edge }) => {
      labels.forEach(({ index }) => {
        edge?.setPropByPath(`labels/${index}/attrs/${path}`, value);
      });
    });
  };

  if (!edgeAttrs) return null;

  return (
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
            defaultValue={(edgeLabelAttrs?.rect?.fill as string) || '#fff'}
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
  );
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

function useSelectedCell(graph: Graph) {
  const [selectCells, setSelectCells] = useState<Cell[]>();
  const [selectedEdgeLabels, setSelectedEdgeLabels] = useState<SelectedLabel[]>([]);
  const [nodeAttrs, setNodeAttrs] = useState<Cell.Properties>();
  const [edgeAttrs, setEdgeAttrs] = useState<Cell.Properties>();
  const [bBox, setBBox] = useState<Rectangle>();

  const loadAttrs = (list: Cell[]) => {
    const cells = list || graph.getSelectedCells();
    const node = cells?.find((cell) => cell.isNode());
    const edge = cells?.find((cell) => cell.isEdge());
    setNodeAttrs(node?.getAttrs());
    setBBox(node?.getBBox());
    setEdgeAttrs(edge?.getAttrs());
  };

  useEffect(() => {
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
    const reloadSelectedCellAttrs = (e: any) => {
      if (e.key === 'ports') return;
      const selectedCells = graph.getSelectedCells();
      if (selectedCells?.length) {
        loadAttrs(selectedCells);
      }
    };

    graph.on('edge:click', edgeClickHandler);
    graph.on('selection:changed', selectFn);
    graph.on('cell:change:*', reloadSelectedCellAttrs);

    return () => {
      graph.off('edge:click', edgeClickHandler);
      graph.off('selection:changed', selectFn);
      graph.on('cell:change:*', reloadSelectedCellAttrs);
    };
  }, [graph]);

  return {
    selectCells,
    selectedEdgeLabels,
    nodeAttrs,
    edgeAttrs,
    bBox,
  };
}
