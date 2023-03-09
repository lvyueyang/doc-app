import { FlowEditor } from '@kangmi/flow';
import data from './data.json';

export default function Flow() {
  return <FlowEditor value={data} />;
}
