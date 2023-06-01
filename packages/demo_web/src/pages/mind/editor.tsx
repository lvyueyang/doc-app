import { MindEditor } from '@kangmi/mind';
import data from './data.json';

export default function Flow() {
  return <MindEditor value={data} />;
}
