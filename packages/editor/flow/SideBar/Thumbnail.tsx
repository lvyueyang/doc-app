import { useState, useEffect } from 'react';
import { Editor } from '../Editor';
import type { EdgeConfig } from '../Editor/edges/types';
import type { NodeConfig } from '../Editor/types';
import type { GroupChildrenItem } from './config';
import styles from './index.module.less';

interface ThumbnailProps {
  type?: GroupChildrenItem['type'];
  shape: string;
  config?: NodeConfig;
}
export default function Thumbnail({ type = 'node', shape, config }: ThumbnailProps) {
  const [cover, setCover] = useState<string>('');

  useEffect(() => {
    createCover(shape, type, config).then((data) => {
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

function createCover(
  shape: string,
  type: GroupChildrenItem['type'],
  config?: NodeConfig | EdgeConfig,
): Promise<string> {
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
  if (type === 'edge') {
    editor.appendEdge(shape, config as EdgeConfig);
  } else {
    editor.appendNode(shape, config as NodeConfig);
  }
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
              let step = 2;
              if (type === 'edge') {
                step = 10;
              }
              svg.setAttribute(
                'viewBox',
                [x - step, y - step, width + step * 2, height + step * 2].join(' '),
              );
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
