import prefix from './prefix'

/**
 * 获取css属性前缀
 * null: 不支持该属性
 * @param el {Element} 用于校验的element
 * @param property {String} css属性
 * @param value {undefined|String} 样式值 设置该值是会进行赋值
 * @returns {String || null}
 */
export default function (el, property, value) {
  if (el.style[property] === undefined) {
    property = prefix.vendor + property.replace(/(\w)/, (v) => v.toUpperCase())
    if (el.style[property] === undefined) return null
  }
  if (typeof value !== 'undefined') el.style[property] = value
  return property
}
