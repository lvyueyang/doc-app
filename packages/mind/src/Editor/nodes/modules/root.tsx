/**
 * 根节点
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock } from '../utils';

const TextBlock = createTextBlock();

const RootNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  return (
    <div>
      <HtmlText node={node} />
    </div>
  );
};

export const RootNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Root'),
  Component: RootNodeComponent,
  propHooks: TextBlock.propHooks,
};
