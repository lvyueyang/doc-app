import type { Cell, Markup, Node } from '@antv/x6';
import { ObjectExt, Shape } from '@antv/x6';
import type { Attr } from '@antv/x6/es/registry';
import {
  DefaultNodeConfig,
  DefaultTextStyle,
  LINE_TYPE,
  PREFIX,
  TextEditorClassName,
} from '../constants';
import type { KMSvgNode, NodeConfig } from '../types';

export const createNodeName = (name: string) => {
  return `${PREFIX}${name}`;
};

export function createTextBlock() {
  const [, markup] = Shape.TextBlock.getMarkup() as any[];

  const attrs = {
    foreignObject: {
      refWidth: '100%',
      refHeight: '100%',
    },
    label: {
      style: {
        ...DefaultTextStyle,
      },
      class: TextEditorClassName,
    },
  };

  const propHooks = (metadata: Node.Metadata) => {
    const { text, ...others } = metadata;
    if (text) {
      ObjectExt.setByPath(others, 'attrs/label/text', text);
    }
    return others;
  };

  return {
    markup,
    attrs,
    propHooks,
    attrHooks: Shape.TextBlock.getAttrHooks(),
  };
}

/** 线条风格 */
export const lineTypeAttrHooks = (lineType: any, options: Record<string, any>) => {
  const { attrs, cell } = options as Attr.Options;
  if (lineType === LINE_TYPE.SOLID.code) {
    cell.setAttrByPath('body/strokeDasharray', 'none');
  }
  if (lineType === LINE_TYPE.DASHED.code) {
    cell.setAttrByPath(
      'body/strokeDasharray',
      [(attrs.strokeWidth as number) * 3, (attrs.strokeWidth as number) * 3].join(' '),
    );
  }
  if (lineType === LINE_TYPE.DOTTED.code) {
    cell.setAttrByPath('body/strokeDasharray', [attrs.strokeWidth, attrs.strokeWidth].join(' '));
  }
};

interface Options {
  name: string;
  inherit?: string | Node.Definition | undefined;
  markup: Markup.JSONMarkup[];
}

export function createApplyTextBlockSvgNode({ name, inherit, markup }: Options) {
  const TextBlock = createTextBlock();

  const node: KMSvgNode = {
    type: 'svg',
    NODE_NAME: createNodeName(name),
    config: {
      inherit,
      markup: [...markup, TextBlock.markup],
      attrs: {
        ...TextBlock.attrs,
      },
      propHooks: TextBlock.propHooks,
      attrHooks: {
        ...TextBlock.attrHooks,
      },
    },
  };

  return node;
}

/** 更新连接桩 */
export function updatePort(node: Node, options: Node['ports']['items']) {
  options.forEach((port) => {
    const p = node.getPort(port.id!);
    if (!p) {
      node.addPort(port);
    } else {
      node.setPortProp(port.id!, 'args', port.args);
    }
  });
}

interface Points {
  x: number;
  y: number;
}
// 计算线段中点坐标
export function getLineCenter(start: Points, end: Points) {
  const x = (start.x + end.x) / 2;
  const y = (start.y + end.y) / 2;

  return {
    x,
    y,
  };
}

/** 将点转为链接桩 */
export function points2PortGroups(obj: Record<string, number[]>) {
  return Object.entries(obj).map(([key, value]) => {
    return {
      group: 'absolute',
      id: key,
      args: {
        x: value[0] * 2,
        y: value[1] * 2,
      },
    };
  });
}

type ComplexAttrValue = Attr.ComplexAttrValue;
export function getLineType({
  lineType,
  strokeWidth,
}: {
  lineType?: ComplexAttrValue;
  strokeWidth?: ComplexAttrValue;
}) {
  if (lineType === LINE_TYPE.SOLID.code) {
    return 'none';
  }
  if (lineType === LINE_TYPE.DASHED.code) {
    return [(strokeWidth as number) * 3, (strokeWidth as number) * 3].join(' ');
  }
  if (lineType === LINE_TYPE.DOTTED.code) {
    return [strokeWidth, strokeWidth].join(' ');
  }
  return 'none';
}

/** 带有文本的 SVG 节点配置 */
export function createTextSvgNodeConfig({
  markup,
  attrs = {},
  propHooks,
  attrHooks,
}: {
  markup: Array<Cell['markup']>;
  attrs?: Cell.Properties;
  propHooks?: (metadata: Node.Metadata) => Node.Metadata;
  attrHooks?: NodeConfig['attrHooks'];
}) {
  const TextBlock = createTextBlock();

  const newAttrs: Cell.Properties = {
    ...TextBlock.attrs,
    body: {
      fill: DefaultNodeConfig.fill,
      stroke: DefaultNodeConfig.stroke,
      strokeWidth: DefaultNodeConfig.strokeWidth,
    },
    ...attrs,
  };

  return {
    markup: [...markup, TextBlock.markup],
    attrs: newAttrs,
    propHooks: (metadata: Node.Metadata) => {
      return TextBlock.propHooks(propHooks?.(metadata) ?? metadata);
    },
    attrHooks: {
      ...TextBlock.attrHooks,
      ...attrHooks,
    },
  };
}

/** svg 路径点字符串转数组 */
export function svgPath2Array(value: string) {
  const result: Array<Array<string | number>> = [];

  value.split(' ').forEach((k) => {
    if (/[A-Za-z]+/.test(k)) {
      result.push([k]);
    } else {
      result[result.length - 1].push(Number(k));
    }
  });

  return result;
}
export function svgPathArray2String(value: Array<Array<string | number>>) {
  return value.map((item) => item.join(' ')).join(' ');
}
