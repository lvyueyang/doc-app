import { FlowEditor } from '@kangmi/editor/flow/FlowEditor';
import styles from './index.module.less';
import data from './data.json';
import data1 from './data1.json';
import data2 from './data2.json';

export default function Flow() {
  return <FlowEditor value={data} />;
}
