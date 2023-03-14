const data = require('./data.json');
const fs = require('fs');
const { startCase } = require('lodash');

const exps = [];
data.forEach((item, ind) => {
  // const name = `XingXing${ind + 1}Icon`;
  const name = `FuHao${startCase(item.name)}Icon`.replace(/\s/gi, '');
  const dir = `./${name}`;
  exps.push(name);
  fs.mkdirSync(dir);
  fs.writeFileSync(
    `${dir}/index.tsx`,
    `import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function ${name}(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      ${item.d}
    </IconContainer>
  );
}
  `,
  );
});

fs.appendFileSync('./index.ts', exps.map((name) => `export * from './${name}';`).join('\n'));
let str = ``;
exps.forEach((name) => {
  str += name + ',';
});
console.log(str);
