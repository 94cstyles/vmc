<template>
  <popup v-model="visible" popup-class="u-indicator" :close-on-click-mask="false" :opacity="0" @touchstart.stop.native>
    <div class="u-indicator-spin"></div>
    <span class="u-indicator-text" v-show="text">{{text}}</span>
  </popup>
</template>
<script>
  export default {
    name: 'indicator',
    data () {
      return {
        visible: false,
        text: ''
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .u-indicator {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2;
    padding: 15px;
    text-align: center;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 5px;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
    &.popup-effect-enter,
    &.popup-effect-leave-active {
      opacity: 0;
    }
    &-spin {
      display: inline-block;
      height: 24px;
      width: 24px;
      vertical-align: middle;
      border: 4px solid rgb(204, 204, 204);
      border-right-color: transparent;
      border-radius: 16px;
      -webkit-animation: fx-indicator-spin 0.8s infinite linear;
      animation: fx-indicator-spin 0.8s infinite linear;
    }
    &-text {
      display: block;
      margin-top: 12px;
      text-align: center;
      line-height: 1;
      font-size: 16px;
      color: #fff;
      word-wrap: normal;
      white-space: nowrap;
    }
  }

  @keyframes fx-indicator-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes fx-indicator-spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
