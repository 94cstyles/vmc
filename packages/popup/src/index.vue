<template>
  <div class="u-popup">
    <div ref="mask" class="u-popup-mask" @touchmove.stop.prevent @click="visible = !closeOnClickMask;$emit('cancel')" :style="maskStyle"></div>
    <transition name="popup-effect" @before-leave="beforeLeave" @after-leave="afterLeave">
      <div v-show="visible" :class="customClass">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'popup',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      // popup的位置。省略则居中显示, 可选['top', 'left', 'right', 'bottom', 'middle']
      position: {
        type: String,
        default: 'middle'
      },
      // 自定义popup样式
      popupClass: {
        type: String,
        default: ''
      },
      // 遮罩层透明度。[-1 ~ 100] 当值为-1时隐藏遮罩层
      opacity: {
        type: Number,
        default: 50
      },
      // 是否可以通过点击遮罩层来关闭popup
      closeOnClickMask: {
        type: Boolean,
        default: true
      },
      // 关闭后是否摧毁dom
      destroy: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visible: false
      }
    },
    watch: {
      visible (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.visible = val
      }
    },
    methods: {
      beforeLeave () {
        this.$emit('popup-before-leave')
      },
      afterLeave () {
        this.$emit('popup-after-leave')
        if (this.destroy) this.$destroy() // 动画结束 立即摧毁
      }
    },
    computed: {
      maskStyle () {
        const opacity = (this.opacity / 100).toFixed(2)
        return {
          display: this.opacity === -1 ? 'none' : 'block',
          backgroundColor: `rgba(0, 0, 0, ${opacity})`
        }
      },
      customClass () {
        return this.popupClass ? `${this.popupClass}` : `u-popup-wrapper is-${this.position}`
      }
    },
    created () {
      if (this.value) {
        this.visible = true
      }
    },
    mounted () {
      document.body.appendChild(this.$el)
    },
    beforeDestroy () {
      document.body.removeChild(this.$el)
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .noscroll,
  .noscroll body {
    overflow: hidden;
  }
  .noscroll body {
    position: relative;
  }

  .u-popup {
    position: absolute;
    &-wrapper {
      position: fixed;
      width: 100%;
      -webkit-transition: .2s ease-out;
      transition: .2s ease-out;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      &.is-middle {
        top: 50%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        &.popup-effect-enter,
        &.popup-effect-leave-active {
          opacity: 0;
        }
      }
      &.is-top {
        top: 0;
        left: 0;
        &.popup-effect-enter,
        &.popup-effect-leave-active {
          -webkit-transform: translate3d(0, -100%, 0);
          transform: translate3d(0, -100%, 0);
        }
      }
      &.is-bottom {
        bottom: 0;
        left: 0;
        &.popup-effect-enter,
        &.popup-effect-leave-active {
          -webkit-transform: translate3d(0, 100%, 0);
          transform: translate3d(0, 100%, 0);
        }
      }
      &.is-left {
        top: 0;
        left: 0;
        height: 100%;
        &.popup-effect-enter,
        &.popup-effect-leave-active {
          -webkit-transform: translate3d(-100%, 0, 0);
          transform: translate3d(-100%, 0, 0);
        }
      }
      &.is-right {
        top: 0;
        right: 0;
        height: 100%;
        &.popup-effect-enter,
        &.popup-effect-leave-active {
          -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
        }
      }
    }
    &-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
    }
  }
</style>
