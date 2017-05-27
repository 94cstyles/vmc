import actionsheet from './src/index.vue'

export default function (Vue) {
  const ActionSheet = Vue.extend(actionsheet)

  /**
   * 操作表
   * @param actions [Array] 菜单 每个对象有 label 和 method 两个键，label 为菜单项的文本或html，method 为点击该菜单项的回调函数
   * @param cancel [String] 取消按钮文本 如果为空字符串就无取消按钮
   * @example vm.$actionsheet([{label:'',method: ()=>])
   * @returns {vm}
   */
  Vue.prototype.$actionsheet = function (actions, cancel = '取消') {
    const instance = new ActionSheet({
      el: document.createElement('div')
    })

    instance.actions = actions
    instance.cancel = cancel

    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
    })

    return instance
  }
}
