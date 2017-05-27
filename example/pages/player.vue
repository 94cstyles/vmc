<template>
  <layout>
    <img style="display: block;width: 100%;margin-bottom: 24px" v-for="(item, index) in videos" :src="item.poster" @click="play(index)">
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        videos: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          poster: 'http://vjs.zencdn.net/v/oceans.png',
          loop: false
        }, {
          src: 'http://devtest.qiniudn.com/若能绽放光芒.mp4',
          poster: 'http://devtest.qiniudn.com/若能绽放光芒.png'
        }]
      }
    },
    methods: {
      play (index) {
        this.$player(this.videos[index])
      }
    }
  }
</script>
<style>
</style>
