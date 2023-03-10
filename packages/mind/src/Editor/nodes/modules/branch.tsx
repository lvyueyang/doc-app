/**
 * 分支主题
 */
import type { KMReactNode, ReactNodeProps } from '../../types';
import HtmlText from '../components/HtmlText';
import { createNodeName, createTextBlock } from '../utils';

const TextBlock = createTextBlock();

const BranchNodeComponent: React.FC<ReactNodeProps> = ({ node }) => {
  return (
    <div>
      <HtmlText node={node} />
    </div>
  );
};

export const BranchNodeConfig: KMReactNode = {
  NODE_NAME: createNodeName('Branch'),
  Component: BranchNodeComponent,
  propHooks: TextBlock.propHooks,
};
