/**
 * 分支主题
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import BaseNode from '../components/BaseNode';
import { createNodeName, createTextBlock } from '../utils';

const TextBlock = createTextBlock();

const BranchNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  return <BaseNode node={node} style={{ padding: '4px 6px' }} />;
};

export const BranchNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Branch'),
  Component: BranchNodeComponent,
  propHooks: TextBlock.propHooks,
};
