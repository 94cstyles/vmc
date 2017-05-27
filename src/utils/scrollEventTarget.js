/**
 * 获取滚动事件源
 * @param node {Element}
 * @returns {*}
 */
export default function (node) {
  if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
    return window
  }

  // 获取父节元素
  function parents (node, ps) {
    if (node === null || node.parentNode === null) return ps

    return parents(node.parentNode, ps.concat([node]))
  }

  function style (node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop)
  }

  function overflow (node) {
    return style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x')
  }

  const nodes = [node].concat(parents(node.parentNode, []))

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName === 'BODY') return window
    if (/(auto|scroll)/.test(overflow(nodes[i]))) return nodes[i]
  }

  return window
}
