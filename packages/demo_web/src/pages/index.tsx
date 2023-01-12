import { List } from 'antd';
import Card from 'antd/es/card';
import { Link } from 'umi';
import styles from './index.module.less';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Card title="菜单" style={{ width: 700 }} size="small">
        <List bordered>
          <Link to="/flow/editor">
            <List.Item>流程图编辑器</List.Item>
          </Link>
        </List>
      </Card>
    </div>
  );
}
