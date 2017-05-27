import directive from './directive'
import plugin from './plugin'

export default function (Vue) {
  Vue.directive('music', directive)
  Vue.prototype.$music = plugin
}
