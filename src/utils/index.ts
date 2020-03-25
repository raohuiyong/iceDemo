/**
 * @description 获取设备类型
 * @param width 设备宽度
 */
function getDevice(width: number) {
  const isPhone =
    typeof navigator !== 'undefined' &&
    navigator &&
    navigator.userAgent.match(/phone/gi);

  if (width < 680 || isPhone) {
    return 'phone';
  } else if (width < 1280 && width > 680) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}
export { getDevice };
