import { Dom } from '@antv/x6';
export const NODE_WIDTH = 60;
export const NODE_HEIGHT = 60;

export const DefaultNodeConfig = {
  stroke: '#333',
  strokeWidth: 2,
  fill: '#FFFFFF',
  fontSize: 14,
  fontColor: '#333',
  label: '',
};

export const PREFIX = 'kangmi';

export const portDefaultStyle = {
  circle: {
    magnet: true,
    stroke: 'blue',
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
