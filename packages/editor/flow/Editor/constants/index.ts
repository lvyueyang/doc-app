import { Dom } from '@antv/x6';
import { theme } from 'antd';
import type { TypeValue } from '../types';

export const NODE_WIDTH = 60;
export const NODE_HEIGHT = 60;
export const PREFIX = 'kangmi';

export const TextEditorClassName = `${PREFIX}TextEditor`;

export const DefaultNodeConfig = {
  stroke: '#333',
  strokeWidth: 2,
  fill: '#FFFFFF',
  fontSize: 14,
  fontColor: '#333',
  label: '',
  strokeDasharray: 'none',
};

export const DefaultTextStyle = {
  fontSize: DefaultNodeConfig.fontSize,
  color: DefaultNodeConfig.fontColor,
  alignItems: 'center',
  justifyContent: 'center',
};

export const portDefaultStyle = {
  circle: {
    magnet: true,
    stroke: theme.defaultConfig.token.colorPrimary,
    r: 0,
  },
};

// 上下左右中心的连接桩
export const TRBL_CENTER_GROUPS = {
  top: {
    position: 'top',
    attrs: {
      ...portDefaultStyle,
    },
  },
  right: {
    position: 'right',
    attrs: {
      ...portDefaultStyle,
    },
  },
  bottom: {
    position: 'bottom',
    attrs: {
      ...portDefaultStyle,
    },
  },
  left: {
    position: 'left',
    attrs: {
      ...portDefaultStyle,
    },
  },
};

// 上下左右顶角的连接桩
export const TRBL_CORNER_GROUPS = {
  topLeft: {
    position: {
      name: 'absolute',
      args: { x: 0, y: 0 },
    },
    attrs: {
      ...portDefaultStyle,
      path: {},
    },
  },
  topRight: {
    position: {
      name: 'absolute',
      args: { x: '100%', y: 0 },
    },
    attrs: {
      ...portDefaultStyle,
    },
  },
  bottomRight: {
    position: {
      name: 'absolute',
      args: { x: '100%', y: '100%' },
    },
    attrs: {
      ...portDefaultStyle,
    },
  },
  bottomLeft: {
    position: {
      name: 'absolute',
      args: { x: 0, y: '100%' },
    },
    attrs: {
      ...portDefaultStyle,
    },
  },
};

export const TextBlockMarkup = {
  tagName: 'foreignObject',
  selector: 'foreignObject',
  children: [
    {
      tagName: 'div',
      selector: 'label',
      ns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        position: 'static',
        backgroundColor: 'transparent',
        textAlign: 'center',
        margin: 0,
        padding: '0px 5px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  ],
};

export const DefaultPortsGroups = {
  absolute: {
    position: {
      name: 'absolute',
    },
    attrs: {
      ...portDefaultStyle,
    },
  },
  line: {
    position: {
      name: 'line',
      args: {
        start: { x: 1, y: 1 },
        end: { x: 1, y: 90 },
      },
    },
    attrs: {
      ...portDefaultStyle,
    },
  },
};

export const LINE_TYPE = {
  SOLID: {
    code: 'solid',
    cname: '实线',
  },
  DASHED: {
    code: 'dashed',
    cname: '虚线',
  },
  DOTTED: {
    code: 'dotted',
    cname: '点线',
  },
} as const;

export type LINE_TYPE_ENUM = TypeValue<typeof LINE_TYPE>['code'];
