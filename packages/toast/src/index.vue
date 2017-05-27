<template>
  <popup v-model="visible" :popup-class="popupClass" :position="position" :destroy="true" :opacity="-1">
    <div class="u-toast-box">
      <i class="u-toast-icon" :class="iconClass" v-show="icon !== ''"></i>
      <span class="u-toast-text">{{message}}</span>
    </div>
  </popup>
</template>
<script>
  export default {
    name: 'toast',
    data () {
      return {
        visible: false,
        // toast的位置。省略则居中显示, 可选['top', 'bottom', 'middle']
        position: 'middle',
        // 带图标的toast。省略为空，可选['success', 'failure']
        icon: '',
        // 消息
        message: ''
      }
    },
    computed: {
      popupClass () {
        return `u-toast ${/^(top|bottom)$/.test(this.position) ? `is-${this.position}` : 'is-middle'}`
      },
      iconClass () {
        return /^(success|failure)$/.test(this.icon) ? `is-${this.icon}` : ''
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .u-toast {
    position: fixed;
    left: 0;
    z-index: 2;
    width: 100%;
    text-align: center;
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    &.popup-effect-enter,
    &.popup-effect-leave-active {
      opacity: 0;
    }
    &.is-middle {
      top: 50%;
      -webkit-transform: translate3d(0, -50%, 0);
      transform: translate3d(0, -50%, 0);
    }
    &.is-top {
      top: 50px;
    }
    &.is-bottom {
      bottom: 50px;
    }
    &-box {
      display: inline-block;
      max-width: 80%;
      padding: 12px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, .7);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    &-text {
      line-height: 20px;
      font-size: 14px;
      color: #e6e6e6;
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-all;
    }
    &-icon {
      display: block;
      width: 72px;
      height: 50px;
      margin: 0 auto;
      background-repeat: no-repeat;
      background-position: center;
      &.is-success {
        background-image: url("../../../src/assets/success.png");
        background-size: 45px auto;
      }
      &.is-failure {
        background-image: url("../../../src/assets/failure.png");
        background-size: 30px auto;
      }
    }
  }
</style>
