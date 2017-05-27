function broadcast (componentName, eventName, ...params) {
  this.$children.forEach((child) => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}

export default function (Vue) {
  Vue.mixin({
    methods: {
      /**
       * 向父组件调度事件 this.$dispatch(componentName, eventName, ...params)
       * @param componentName {String}
       * @param eventName {String}
       * @param params {Array}
       */
      $dispatch (componentName, eventName, ...params) {
        let parent = this.$parent
        let name = parent.$options.name

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent

          if (parent) {
            name = parent.$options.name
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params))
        }
      },
      /**
       * 向子组件广播事件 this.$broadcast(componentName, eventName, ...params)
       * @param componentName {String}
       * @param eventName {String}
       * @param params {Array}
       */
      $broadcast (componentName, eventName, ...params) {
        broadcast.apply(this, [componentName, eventName].concat(params))
      }
    }
  })
}
