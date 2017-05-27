import SUPPORT_ONLY_TOUCH from '../../src/utils/supportOnlyTouch'

export default function (Vue) {
  Vue.directive('outerTouch', {
    bind (el, {value}, vnode) {
      el.handler = function (e) {
        if (!el.getAttribute('outer-touch-disabled') && !el.contains(e.target)) {
          value()
        }
      }

      document.addEventListener(SUPPORT_ONLY_TOUCH ? 'touchstart' : 'click', el.handler, true)
    },
    unbind (el) {
      document.removeEventListener(SUPPORT_ONLY_TOUCH ? 'touchstart' : 'click', el.handler, true)
      el.handler = null
    }
  })
}
