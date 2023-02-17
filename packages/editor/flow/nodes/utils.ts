import type { Node, Markup } from '@antv/x6';
import { ObjectExt, Shape } from '@antv/x6';
import { PREFIX } from './constants';
import type { KMSvgNode } from './types';

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
        fontSize: 14,
      },
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
  const ports = node.getPorts();
  if (!ports.length) {
    node.addPorts(options);
  } else {
    options.forEach((port) => {
      node.setPortProp(port.id!, 'args', port.args);
    });
  }
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
