import popup from './src/index.vue'

let index = 1000 // 弹出窗z-index
const POPUP_QUEUE = [] // 弹出窗队列

export default function (Vue) {
  popup.mixins = [{
    watch: {
      visible (val) {
        if (val) {
          // 更新弹出窗状态
          this.$el.style.zIndex = ++index
          this.$el.style.display = 'block'
          // 显示遮罩层
          if (this.opacity >= 0) this.$refs.mask.style.display = 'block'

          // 如果当前弹出窗有遮罩层 则隐藏内层弹出窗的遮罩层
          if (POPUP_QUEUE.length > 0 && this.opacity > 0) {
            for (let i = 0; i < POPUP_QUEUE.length; i++) {
              if (POPUP_QUEUE[i].opacity > 0 && POPUP_QUEUE[i].$refs.mask && POPUP_QUEUE[i].$refs.mask.style.display !== 'none') {
                POPUP_QUEUE[i].$refs.mask.style.display = 'none'
                break
              }
            }
          }

          // 添加弹出窗进队列
          POPUP_QUEUE.unshift(this)
        }
      }
    },
    mounted () {
      if (!this.visible) this.$el.style.display = 'none' // 当前弹出层是隐藏的

      this.$on('popup-before-leave', () => {
        // 处理遮罩层
        if (this.$refs.mask.style.display !== 'none' && this.opacity > 0 && POPUP_QUEUE.length > 0) {
          this.$refs.mask.style.display = 'none'
          // 显示最外层弹出窗的遮罩层
          for (let i = 0; i < POPUP_QUEUE.length; i++) {
            if (POPUP_QUEUE[i].opacity > 0 && POPUP_QUEUE[i].$refs.mask) {
              POPUP_QUEUE[i].$refs.mask.style.display = 'block'
              break
            }
          }
        }
      })

      this.$on('popup-after-leave', () => {
        // 从队列中移除
        POPUP_QUEUE.splice(POPUP_QUEUE.indexOf(this), 1)
        // 隐藏弹出窗
        this.$el.style.display = 'none'
        this.$refs.mask.style.display = 'none'
      })
    }
  }]

  // 关闭所有弹窗
  Vue.prototype.$popup = {
    close () {
      POPUP_QUEUE.forEach((instance) => {
        instance.visible = false
      })
    }
  }
  Vue.component(popup.name, popup)
}
