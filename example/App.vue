<template>
  <router-view></router-view>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    watch: {
      '$route' () {
        if (this.$music) this.$music.stop() // 关闭音乐
        if (this.$http) this.$http.abort() // 终止上一个页面未处理完的请求
        if (this.$indicator) this.$indicator.close() // 关闭上一个页面打开的indicator
        if (this.$popup) this.$popup.close() // 关闭弹窗
      }
    },
    methods: {
      rem () {
        document.documentElement.style.fontSize = (document.documentElement.clientWidth / 10) + 'px'
      }
    },
    created () {
      this.rem()
      window.addEventListener('resize', this.rem)
    }
  }
</script>
<style lang="scss" type="text/scss">
  * {
    margin: 0;
    padding: 0;
    outline: none;
  }

  ul, dl {
    list-style: none;
  }

  html, body {
    height: 100%;
    user-select: none;
  }

  html {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-size: 14px;
    font-family: Helvetica Neue, Helvetica, STHeiTi, Arial, sans-serif;
  }

  .button {
    display: block;
    width: 100%;
    height: 40px;
    padding: 0;
    margin-bottom: 20px;
    text-align: center;
    line-height: 38px;
    font-size: 16px;
    color: #656b79;
    background-color: #f6f8fa;
    border: 1px solid rgba(#b8bbbf, .5);
    border-radius: 4px;
  }
</style>
