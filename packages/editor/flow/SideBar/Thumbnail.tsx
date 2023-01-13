import { useState, useEffect } from 'react';
import { Editor } from '../Editor';
import type { NodeConfig, NODE_NAME_ENUM } from '../Editor/nodes';
import styles from './index.module.less';

interface ThumbnailProps {
  shape: NODE_NAME_ENUM;
  config?: NodeConfig;
}
export default function Thumbnail({ shape, config }: ThumbnailProps) {
  const [cover, setCover] = useState<string>('');

  useEffect(() => {
    createCover(shape, config).then((data) => {
      setCover(data);
    });
  }, [shape, config]);

  return <div className={styles.thumbnailCover} dangerouslySetInnerHTML={{ __html: cover }} />;
}

function createCover(shape: NODE_NAME_ENUM, config?: NodeConfig): Promise<string> {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  const container = document.createElement('div');
  container.style.width = '500px';
  container.style.height = '200px';
  iframe.contentWindow?.document.body.appendChild(container);
  iframe.style.display = 'none';

  const editor = new Editor({
    container,
  });
  editor.appendNode(shape, config);
  return new Promise((resolve) => {
    setTimeout(() => {
      editor.graph.toSVG(
        (dataUri) => {
          iframe.remove();
          resolve(dataUri);
        },
        { copyStyles: false },
      );
    }, 400);
  });
}
