/**
 * 获取元素的滚动条高度
 * @param node {Element}
 * @returns {number}
 */
export default function (node) {
  if (node === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  } else {
    return node.scrollTop
  }
}
