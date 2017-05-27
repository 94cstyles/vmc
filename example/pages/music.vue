<template>
  <layout>
    <button class="button musicButton" v-for="item in music" v-music="item.src">{{item.name}}</button>
    <button class="button musicButton" @click="$music.stop()">关闭音乐</button>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        music: [{
          'name': '周三的情书',
          'src': 'https://yppphoto.yupaopao.cn/upload/c86905928fd6c4bc7cec35c74c8e744f.mp3'
        }, {
          'name': '历历万乡',
          'src': 'https://yppphoto.yupaopao.cn/upload/f9bffa823157c669690bc99c57c16872.mp3'
        }, {
          'name': '流氓',
          'src': 'https://yppphoto.yupaopao.cn/activity/2017/5/5/03594cf8-e747-4ca2-ba1d-fd3cbfda343a.mp3'
        }]
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .musicButton {
    &.is-play {
      color: #fff;
      background-color: #c7254e;
    }
    &.is-loading {
      color: #fff;
      background-color: #656b79;
    }
  }
</style>
