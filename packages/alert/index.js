import alert from './src/index.vue'

export default function (Vue, options) {
  const Alert = Vue.extend(alert)

  /**
   * 提示框工厂
   * @param opts {Object} 配置
   * @returns {vm}
   */
  function factory (opts) {
    const instance = new Alert({
      el: document.createElement('div')
    })

    opts = Object.assign({}, opts)
    for (const key in opts) {
      instance[key] = opts[key]
    }

    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
    })

    return instance
  }

  /**
   * 输入提示框
   * @param args [Object|String] 参数
   * @example vm.$prompt('请输入你的姓名')
   * @example vm.$prompt({title: '请输入你的手机', inputType: 'tel', inputValue: '', inputPlaceholder: ''})
   * @type {Promise}
   */
  Vue.prototype.$prompt = function (arg) {
    return new Promise((resolve, reject) => {
      const opts = Object.assign({
        showInput: true,
        inputType: 'text',
        inputValue: '',
        inputPlaceholder: '',
        closeOnClickMask: true,
        buttons: [{
          'label': '取消',
          'method': reject
        }, {
          'label': '确定',
          'method': () => resolve(instance.inputValue)
        }]
      }, typeof arg === 'string' ? {title: arg} : arg)

      const instance = factory(opts)
      instance.$on('cancel', reject)
    })
  }

  /**
   * 确认提示框
   * @param args [Array] 参数
   * @example vm.$confirm('确定执行此操作?')
   * @example vm.$confirm('系统提示', '确定执行此操作?')
   * @returns {Promise}
   */
  Vue.prototype.$confirm = function (...args) {
    return new Promise((resolve, reject) => {
      const opts = {
        title: args.length === 1 ? '提示' : args[0],
        message: args[args.length === 1 ? 0 : 1],
        closeOnClickMask: true,
        buttons: [{
          'label': '取消',
          'method': reject
        }, {
          'label': '确定',
          'method': resolve
        }]
      }

      const instance = factory(opts)
      instance.$on('cancel', reject)
    })
  }

  /**
   * 弹出式提示框
   * @param args [Array] 参数
   * @example vm.$alert({...})
   * @example vm.$alert('这是一条消息提示')
   * @example vm.$alert('系统提示', '这是一条消息提示')
   * @returns {vm}
   */
  Vue.prototype.$alert = function (...args) {
    const opts = Object.prototype.toString.call(args[0]) === '[object Object]' ? args[0] : {
      title: args.length === 1 ? '提示' : args[0],
      message: args[args.length === 1 ? 0 : 1]
    }

    return factory(opts)
  }
}
