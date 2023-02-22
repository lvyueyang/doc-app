import { FlowEditor } from '@kangmi/editor/flow/FlowEditor';
import styles from './index.module.less';
import data from './data.json';

export default function Flow() {
  return <FlowEditor value={data} />;
}
