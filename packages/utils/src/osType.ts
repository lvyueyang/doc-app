/** 操作系统类型 */
function getOS() {
  const userAgent = navigator.userAgent;
  let os = 'Unknown';
  if (userAgent.indexOf('Win') !== -1) {
    os = 'Windows';
  } else if (userAgent.indexOf('Mac') !== -1) {
    os = 'MacOS';
  } else if (userAgent.indexOf('Linux') !== -1) {
    os = 'Linux';
  } else if (userAgent.indexOf('Android') !== -1) {
    os = 'Android';
  } else if (userAgent.indexOf('like Mac') !== -1) {
    os = 'iOS';
  }
  return os;
}
const os = getOS();

export const isWin = os === 'Windows';
export const isMac = os === 'MacOS';
export const isLinux = os === 'Linux';
export const isAndroid = os === 'Android';
export const isIOS = os === 'iOS';
