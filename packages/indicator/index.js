import indicator from './src/index.vue'

export default function (Vue) {
  const Indicator = Vue.extend(indicator)
  let instance

  /**
   * 加载提示框
   * @example vm.$indicator.open(text?)
   * @example vm.$indicator.close()
   * @type {{
   * open: Function, close: Function
   * }}
   */
  Vue.prototype.$indicator = {
    open (text) {
      if (!instance) {
        instance = new Indicator({
          el: document.createElement('div')
        })

        document.body.appendChild(instance.$el)
      }

      Vue.nextTick(() => {
        instance.text = text || ''
        instance.visible = true
      })
    },
    close () {
      if (instance) {
        instance.visible = false
      }
    }
  }
}
