const a = [];
for (const i of document.querySelectorAll(
  'body > div.mind-corner.mind-right-con.right.active > div:nth-child(3) > div.con > div > div:nth-child(16) svg',
)) {
  const id = i.querySelector('use')?.getAttribute('xlink:href');
  const val = document.querySelector(id ?? '')?.innerHTML;
  a.push({
    name: id?.split('-')[2],
    d: val,
  });
}
console.log(JSON.stringify(a));
