import './polyfills'
import popup from '../packages/popup'
import indicator from '../packages/indicator'
import toast from '../packages/toast'
import alert from '../packages/alert'
import actionsheet from '../packages/actionsheet'
import drowdown from '../packages/dropdown'
import uploader from '../packages/uploader'
import virtualScroll from '../packages/virtual-scroll'
import infiniteScroll from '../packages/infinite-scroll'
import lazyload from '../packages/lazyload'
import outerTouch from '../packages/outer-touch'
import http from '../packages/http'
import storage from '../packages/storage'
import asyncData from '../packages/async-data'
import emitter from '../packages/emitter'
import music from '../packages/music'
import player from '../packages/player'

const Install = function (Vue, options = {}) {
  if (typeof window.Vue === 'undefined') window.Vue = Vue

  Vue.use(popup)
  Vue.use(indicator)
  Vue.use(toast, options.toast)
  Vue.use(alert)
  Vue.use(actionsheet)
  Vue.use(drowdown)
  Vue.use(uploader, options.uploader)
  Vue.use(infiniteScroll)
  Vue.use(virtualScroll)
  Vue.use(lazyload, options.lazyload)
  Vue.use(outerTouch)
  Vue.use(http, options.http)
  Vue.use(storage)
  Vue.use(asyncData)
  Vue.use(emitter)
  Vue.use(music)
  Vue.use(player)
}

if (typeof window !== 'undefined' && window.Vue) {
  Install(Vue, window.VueOptions || {})
}

export default Install
