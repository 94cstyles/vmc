import InfiniteScroll from './infiniteScroll'

const ctx = '@@InfiniteScroll'

export default function (Vue) {
  Vue.directive('infiniteScroll', {
    inserted (el, {value}, {context}) {
      Vue.nextTick(() => {
        el[ctx] = new InfiniteScroll({
          el,
          vm: context,
          handler: value
        })
      })
    },
    unbind (el) {
      el[ctx] && el[ctx].destroy()
    }
  })
}
