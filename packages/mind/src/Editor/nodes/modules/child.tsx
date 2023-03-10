/**
 * 子主题
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock } from '../utils';

const TextBlock = createTextBlock();

const ChildNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  return (
    <div>
      <HtmlText node={node} />
    </div>
  );
};

export const ChildNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Child'),
  Component: ChildNodeComponent,
  propHooks: TextBlock.propHooks,
};
