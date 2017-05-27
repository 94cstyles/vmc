// 判断当前设备是否支持touch事件
const SUPPORT_ONLY_TOUCH = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch  // eslint-disable-line

export default SUPPORT_ONLY_TOUCH
