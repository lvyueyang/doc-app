/** 下载文件 */
export function downloadFile(url: string, name: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  a.remove();
}

/** 下载 JSON 文件 */
export function downloadJson(value: string, name: string) {
  const blob = new Blob([value]);
  downloadFile(URL.createObjectURL(blob), `${name}.json`);
}
