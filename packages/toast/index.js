import toast from './src/index.vue'

export default function (Vue, options) {
  const Toast = Vue.extend(toast)
  const DEFAULT = Object.assign({
    position: 'middle',
    duration: 2400
  }, options)

  let instance, time

  /**
   * 消息提示框
   * @param args [array] 参数
   * @example vm.$toast({...})
   * @example vm.$toast('提示信息')
   * @example vm.$toast('提示信息', true | false)
   * @returns {vm}
   */
  Vue.prototype.$toast = function (...args) {
    const opts = Object.assign({}, DEFAULT, Object.prototype.toString.call(args[0]) === '[object Object]' ? args[0] : {
      message: args[0],
      icon: args.length > 1 ? (args[1] ? 'success' : 'failure') : ''
    })
    if (instance) {
      instance.visible = false
      clearTimeout(time)
    }
    instance = new Toast({
      el: document.createElement('div')
    })

    for (const key in opts) {
      instance[key] = opts[key]
    }

    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
      time = setTimeout(function () {
        instance.visible = false
      }, opts.duration)
    })

    return instance
  }
}
