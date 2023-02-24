import { useState, useEffect } from 'react';
import { Editor } from '../Editor';
import type { NodeConfig } from '../Editor/nodes1';
import styles from './index.module.less';

interface ThumbnailProps {
  shape: string;
  config?: NodeConfig;
}
export default function Thumbnail({ shape, config }: ThumbnailProps) {
  const [cover, setCover] = useState<string>('');

  useEffect(() => {
    createCover(shape, config).then((data) => {
      setCover(data);
    });
  }, [shape, config]);

  // return (
  //   <div className={styles.thumbnailCover}>
  //     <img src={cover} alt="" />
  //   </div>
  // );
  return <div className={styles.thumbnailCover} dangerouslySetInnerHTML={{ __html: cover }} />;
}

function createCover(shape: string, config?: NodeConfig): Promise<string> {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  const container = document.createElement('div');
  container.style.width = '500px';
  container.style.height = '200px';
  iframe.contentWindow?.document.body.appendChild(container);
  iframe.style.display = 'none';

  const editor = new Editor({
    container,
    mode: 'cover',
  });
  editor.appendNode(shape, config);
  return new Promise((resolve) => {
    setTimeout(() => {
      editor.graph.toSVG(
        (dataUri) => {
          iframe.remove();
          resolve(dataUri);
        },
        {
          copyStyles: false,
          beforeSerialize(svg) {
            const viewBox = svg.getAttribute('viewBox');
            if (viewBox) {
              // 给 viewBox 加个 2 的 padding
              const [x, y, width, height] = viewBox.split(' ').map((i) => Number(i));
              svg.setAttribute('viewBox', [x - 2, y - 2, width + 4, height + 4].join(' '));
            }
          },
        },
      );
      // editor.graph.toPNG(
      //   (dataUri) => {
      //     iframe.remove();
      //     resolve(dataUri);
      //   },
      //   {
      //     padding: 2,
      //     backgroundColor: 'rgba(0,0,0,0)',
      //   },
      // );
    }, 1000);
  });
}
