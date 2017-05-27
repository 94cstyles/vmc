// 判断是否支持webp格式的图片
const SUPPORT_WEBP = (function () {
  let support = true
  const d = document

  try {
    const el = d.createElement('object')
    el.type = 'image/webp'
    el.innerHTML = '!'
    d.body.appendChild(el)
    support = !el.offsetWidth
    d.body.removeChild(el)
  } catch (err) {
    support = false
  }

  return support
})()

export default SUPPORT_WEBP
