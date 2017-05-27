/**
 * 检测当前浏览的前缀
 */
const docStyle = document.documentElement.style
let engine

if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
  engine = 'presto'
} else if ('MozAppearance' in docStyle) {
  engine = 'gecko'
} else if ('WebkitAppearance' in docStyle) {
  engine = 'webkit'
} else if (typeof navigator.cpuClass === 'string') {
  engine = 'trident'
}

export default {
  css: {trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-'}[engine] || '',
  vendor: {trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O'}[engine] || ''
}
