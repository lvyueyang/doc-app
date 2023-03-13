/**
 * 子主题
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import BaseNode from '../components/BaseNode';
import { createNodeName, createTextBlock } from '../utils';

const TextBlock = createTextBlock();

const ChildNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  return <BaseNode node={node} style={{ padding: '4px 6px' }} />;
};

export const ChildNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Child'),
  Component: ChildNodeComponent,
  propHooks: TextBlock.propHooks,
};
