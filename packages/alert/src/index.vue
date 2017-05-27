<template>
  <popup v-model="visible" popup-class="u-alert" :destroy="true" :close-on-click-mask="closeOnClickMask" :opacity="opacity" @cancel="$emit('cancel')">
    <div class="u-alert-header" v-show="title">{{title}}</div>
    <div class="u-alert-content" v-show="!showInput" v-html="message"></div>
    <div class="u-alert-input" v-show="showInput">
      <input ref="input" type="text" v-model="inputValue" :placeholder="inputPlaceholder">
    </div>
    <div class="u-alert-button" v-show="buttons.length > 0">
      <a @click="tap(index)" v-for="(btn, index) of buttons" :style="buttonStyle">
        {{btn.label}}
      </a>
    </div>
  </popup>
</template>
<script>
  export default {
    data () {
      return {
        visible: false,
        closeOnClickMask: false,
        opacity: 50,
        title: '',
        message: '',
        showInput: false,
        inputType: 'text',
        inputValue: '',
        inputPlaceholder: '',
        buttons: [{
          'label': '确定',
          'method': null
        }]
      }
    },
    watch: {
      inputType (val) {
        this.$refs.input.type = val
      }
    },
    methods: {
      close () {
        this.visible = false
      },
      tap (index) {
        if (typeof this.buttons[index].method === 'function') this.buttons[index].method()
        this.close()
      }
    },
    computed: {
      buttonStyle () {
        return {width: 100 / this.buttons.length + '%'}
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .u-alert {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2;
    width: 85%;
    background-color: #fff;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    overflow: hidden;
    &.popup-effect-enter {
      opacity: 0;
      -webkit-transform: translate3d(-50%, -50%, 0) scale(.7);
      transform: translate3d(-50%, -50%, 0) scale(.7);
    }
    &.popup-effect-leave-active {
      opacity: 0;
      -webkit-transform: translate3d(-50%, -50%, 0) scale(.9);
      transform: translate3d(-50%, -50%, 0) scale(.9);
    }
    &-header {
      padding-top: 15px;
      line-height: 1;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: #333;
    }
    &-content {
      min-height: 24px;
      padding: 16px 20px 20px;
      line-height: 24px;
      text-align: center;
      font-size: 16px;
      color: #999;
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-all;
    }
    &-input {
      padding: 15px 20px;
      input {
        display: block;
        width: 100%;
        height: 32px;
        border-radius: 5px;
        padding: 4px 12px;
        font-size: 12px;
        color: #666;
        border: 1px solid #dedede;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
      }
    }
    &-button {
      position: relative;
      border-top: 1px solid #ddd;
      &::after {
        clear: both;
        content: "";
        display: table;
      }
      a {
        float: left;
        height: 40px;
        padding: 0;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #2f2f2f;
        border: 0 none;
        background-color: transparent;
        .hairlines & {
          border-top-width: .5px;
        }
        &:last-child {
          color: #1d9aff;
        }
        & + a {
          margin-left: -1px;
          border-left: 1px solid #ddd;
          .hairlines & {
            border-left-width: .5px;
          }
        }
      }
    }
  }
</style>
