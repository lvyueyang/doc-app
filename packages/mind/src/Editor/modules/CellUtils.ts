import type { Node } from '@antv/x6';
import { cloneDeep } from 'lodash';
import { BranchNodeConfig, ChildNodeConfig, RootNodeConfig } from '../nodes';
import type { IconDataItem, Icons, NodeConfig, Remark, TagDataItem, Tags } from '../types';
import { shape2Theme } from '../utils';
import { BaseModule } from './BaseModule';

export class CellUtils extends BaseModule {
  /** 创建节点 */
  createNode = (shape: string, config?: NodeConfig) => {
    const { node, size, content } = shape2Theme(shape, this.editor.theme.getTheme());
    return this.graph.createNode({
      shape,
      width: size.width,
      height: size.height,
      ...config,
      attrs: {
        ...config?.attrs,
        box: {
          ...config?.attrs?.box,
          style: { ...node },
        },
        label: {
          ...config?.attrs?.label,
          style: {
            ...content,
          },
        },
      },
    });
  };

  /** 创建根节点 */
  createRootNode = (config?: NodeConfig) => {
    return this.createNode(RootNodeConfig.NODE_NAME, {
      ...config,
      attrs: {
        label: {
          text: '中心主题',
        },
      },
    });
  };

  /** 创建分支节点 */
  createBranchNode = (config?: NodeConfig) => {
    return this.createNode(BranchNodeConfig.NODE_NAME, {
      ...config,
      attrs: {
        label: {
          text: '分支主题',
        },
      },
    });
  };

  /** 创建子节点 */
  createChildNode = (config?: NodeConfig) => {
    return this.createNode(ChildNodeConfig.NODE_NAME, {
      ...config,
      attrs: {
        label: {
          text: '子主题',
        },
      },
    });
  };

  /** 添加根节点 */
  appendRootNode = (options?: { isCenter?: boolean }) => {
    let center;
    if (options?.isCenter) {
      center = this.graph.getGraphArea().center;
    }
    const rootNode = this.createRootNode({
      ...center,
    });
    this.graph.addNode(rootNode);
    this.editor.layout.layout(rootNode.id);
  };

  /** 添加子节点 */
  appendChildNode = (node?: Node) => {
    const selectedNode = this.graph.getSelectedCells().filter((cell) => cell.isNode())[0];
    if (selectedNode) {
      let childNode = node;
      if (!childNode) {
        childNode =
          selectedNode.shape === RootNodeConfig.NODE_NAME
            ? this.createBranchNode()
            : this.createChildNode();
      }

      selectedNode.addChild(this.graph.addNode(childNode));
      this.editor.layout.layout(childNode.id);
      return childNode;
    }
    return false;
  };

  /** 添加兄弟节点 */
  appendNeighborNode = (node?: Node) => {
    const selectedNode = this.graph.getSelectedCells().filter((cell) => cell.isNode())[0];

    if (selectedNode) {
      const selectedNodeId = selectedNode?.id;
      const parent = this.graph
        .getNodes()
        .find((n) => n.getChildren()?.find((c) => c.id === selectedNodeId));

      if (!parent) return false;

      let childNode = node;
      if (!childNode) {
        childNode =
          parent.shape === RootNodeConfig.NODE_NAME
            ? this.createBranchNode()
            : this.createChildNode();
      }
      const index = parent?.getChildren()?.indexOf(selectedNode) ?? 0;
      parent.insertChild(this.graph.addNode(childNode), index + 1);
      this.editor.layout.layout(childNode.id);
      return childNode;
    }
    return false;
  };

  /** 为节点添加表情 */
  addIcon = (node: Node, groupName: string, iconName: string, isOnly: boolean) => {
    if (!node) return;
    const nodeData = node.data || {};
    let icons: Icons = cloneDeep(nodeData.icons) || [];
    const iconItem: IconDataItem = {
      groupName,
      iconName,
    };

    if (!icons.length) {
      icons.push(iconItem);
    } else {
      const findIcon = icons.find(
        (i) => i.groupName === iconItem.groupName && i.iconName === iconItem.iconName,
      );

      if (findIcon) {
        // 已存在直接删除
        this.removeIcon(node, iconItem.iconName);
        return;
      }

      const findGroupIcon = icons.find((i) => i.groupName === iconItem.groupName);
      if (findGroupIcon && isOnly) {
        icons = icons.map((icon) => {
          if (icon.groupName === iconItem.groupName) {
            return iconItem;
          }
          return icon;
        });
      } else {
        icons.push(iconItem);
      }
    }
    node.setData({ ...nodeData, icons });
  };

  /** 为节点删除表情 */
  removeIcon(node: Node<Node.Properties>, iconName: string) {
    const nodeData = node.data || {};
    const icons: Icons = cloneDeep(nodeData.icons) || [];
    node.setData(
      {
        ...nodeData,
        icons: icons.filter((icon) => icon.iconName !== iconName),
      },
      {
        deep: false,
      },
    );
  }

  /** 为节点添加标签 */
  addTag = (node: Node, tagItem: TagDataItem) => {
    if (!node) return;
    const nodeData = node.data || {};
    const tags: Tags = cloneDeep(nodeData.tags) || [];
    if (tags.find((tag) => tag.value === tagItem.value)) return;
    tags.push(tagItem);
    console.log('tags: ', tags);
    node.setData({ tags });
  };

  /** 更新节点标签 */
  updateTag = (node: Node, oldValue: string, tagItem: TagDataItem) => {
    if (!node) return;
    const nodeData = node.data || {};
    let tags: Tags = cloneDeep(nodeData.tags) || [];
    tags = tags.map((tag) => {
      if (tag.value === oldValue) {
        return {
          ...tagItem,
        };
      }
      return tag;
    });
    node.setData(
      { ...nodeData, tags },
      {
        deep: false,
      },
    );
  };

  /** 为节点删除标签 */
  removeTag(node: Node<Node.Properties>, value: string) {
    const nodeData = node.data || {};
    const tags: Tags = cloneDeep(nodeData.tags) || [];
    node.setData(
      {
        ...nodeData,
        tags: tags.filter((tag) => tag.value !== value),
      },
      {
        deep: false,
      },
    );
  }

  /** 更新备注信息 */
  updateRemark(node: Node, remark: Remark) {
    const nodeData = node.data || {};
    node.setData(
      {
        ...nodeData,
        remark,
      },
      {
        deep: false,
      },
    );
  }
}
