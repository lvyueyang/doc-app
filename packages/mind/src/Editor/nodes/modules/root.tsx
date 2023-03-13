/**
 * 根节点
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import BaseNode from '../components/BaseNode';
import { createNodeName, createTextBlock } from '../utils';

const TextBlock = createTextBlock();

const RootNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  return <BaseNode node={node} />;
};

export const RootNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Root'),
  Component: RootNodeComponent,
  propHooks: TextBlock.propHooks,
};
