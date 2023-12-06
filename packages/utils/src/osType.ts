/** 操作系统类型 */
function getOS() {
  const userAgent = navigator.userAgent;
  let os = 'Unknown';
  if (userAgent.includes('Win')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac')) {
    os = 'MacOS';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('like Mac')) {
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
