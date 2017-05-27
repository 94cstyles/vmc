<template>
  <layout>
    <vue-markdown class="document" :source="$data[this.$route.params.type] || ''" @rendered="rendered()"></vue-markdown>
  </layout>
</template>
<script>
  import popup from '../../packages/popup/README.md'
  import indicator from '../../packages/indicator/README.md'
  import toast from '../../packages/toast/README.md'
  import alert from '../../packages/alert/README.md'
  import actionsheet from '../../packages/actionsheet/README.md'
  import dropdown from '../../packages/dropdown/README.md'
  import uploader from '../../packages/uploader/README.md'
  import virtualscroll from '../../packages/virtual-scroll/README.md'
  import infinitescroll from '../../packages/infinite-scroll/README.md'
  import lazyload from '../../packages/lazyload/README.md'
  import outertouch from '../../packages/outer-touch/README.md'
  import storage from '../../packages/storage/README.md'
  import http from '../../packages/http/README.md'
  import asyncdata from '../../packages/async-data/README.md'
  import emitter from '../../packages/emitter/README.md'
  import music from '../../packages/music/README.md'
  import player from '../../packages/player/README.md'

  export default {
    data () {
      return {
        popup,
        indicator,
        toast,
        alert,
        actionsheet,
        dropdown,
        uploader,
        outertouch,
        virtualscroll,
        infinitescroll,
        lazyload,
        storage,
        http,
        asyncdata,
        emitter,
        music,
        player
      }
    },
    methods: {
      rendered () {
        this.$nextTick(() => Prism.highlightAll()) // eslint-disable-line
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .document {
    line-height: 2;
    > h1:nth-child(1) {
      display: none;
      & + h2 {
        margin-top: 0;
      }
    }
    a {
      padding: 2px 4px;
      color: #07a;
      font-size: 90%;
      text-decoration: none;
      border-radius: 4px;
    }
    h1, h2, h3 {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 18px;
    }
    h3 {
      font-size: 16px;
    }
    code, kbd, pre, samp {
      font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    }
    p {
      code {
        padding: 2px 4px;
      }
    }
    code {
      font-size: 90%;
      color: #c7254e;
      background-color: #f9f2f4;
      border-radius: 4px;
    }

    table {
      width: 100%;
      max-width: 100%;
      margin-bottom: 16px;
      table-layout: fixed;
      background-color: #fff;
      border-collapse: collapse;
      border-spacing: 0;
      td,
      th {
        padding: 8px;
        vertical-align: top;
        border: 1px solid #eee;
        text-align: center;
        color: #656b79
      }
      th {
        font-weight: 400;
        background-color: #f4f5f7;
        &:nth-child(3),
        &:nth-child(5) {
          width: 100px;
        }
      }
      code {
        padding: 2px 4px;
      }
    }

    blockquote {
      padding: 0 1em;
      color: #6a737d;
      border-left: .25em solid #dfe2e5;
    }
  }
</style>
