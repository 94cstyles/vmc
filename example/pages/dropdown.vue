<template>
  <layout>
    <drop-down v-model="value" :options="options" label="请选择你所在的城市"></drop-down>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        value: '',
        options: [{
          'text': '重庆',
          'value': 'cq'
        }, {
          'text': '上海',
          'value': 'sh'
        }, {
          'text': '南京',
          'value': 'nj'
        }, {
          'text': '天津',
          'value': 'tj'
        }, {
          'text': '北京',
          'value': 'bj'
        }, {
          'text': '杭州',
          'value': 'hz'
        }, {
          'text': '深圳',
          'value': 'sz'
        }]
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .u-dropDown {
    position: relative;
    &-input {
      height: 40px;
      padding: 0;
      margin-bottom: 20px;
      text-align: center;
      line-height: 38px;
      font-size: 16px;
      color: #656b79;
      background-color: #fff;
      border: 1px solid rgba(#b8bbbf, .5);
      border-radius: 4px;
      &.is-open {
        border-radius: 4px 4px 0 0;
      }
    }

    &-box {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      max-height: 300px;
      margin-top: -1px;
      background-color: #fff;
      border: 1px solid rgba(#b8bbbf, .5);
      border-radius: 0 0 4px 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    &-options {
      margin: 0;
      padding: 0;
    }

    &-item {
      margin: 0;
      padding: 0 12px;
      line-height: 36px;
      list-style: none;
      &.is-selected {
        color: #1d9aff;
      }
    }
  }
</style>
