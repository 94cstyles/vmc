// 判断是否支持passive
const SUPPORT_PASSIVE = (function () {
  let supportsPassive = false
  document.createElement('div').addEventListener('test', function () {}, {
    get passive () {
      supportsPassive = true
      return false
    }
  })

  return supportsPassive
})()

export default SUPPORT_PASSIVE
