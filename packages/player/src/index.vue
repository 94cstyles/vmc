<template>
  <popup v-model="visible" position="right" :opacity="0" @touchmove.native.stop.prevent>
    <div class="u-player">
      <video class="u-player-video"
             x-webkit-airplay="allow"
             webkit-playsinline="true"
             playsinline="true"
             x5-video-player-type="h5"
             crossorigin="anonymous"
             preload="auto"
             :loop="loop"
             :poster="poster"
             :src="src"
             ref="video">
      </video>
      <div class="u-player-controller">
        <button class="u-player-btn" @click="switchVideo()">
          <svg width="100%" height="100%" :viewBox="state === 'play' ? '0 0 17 32' : '0 0 16 32'" version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <path v-show="state === 'play'" fill="#ffffff"
                  d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path>
            <path v-show="state !== 'play'" fill="#ffffff"
                  d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path>
          </svg>
        </button>
        <div class="u-player-time"><span>{{secondToTime(played)}}</span> / <span>{{secondToTime(duration)}}</span></div>
        <div class="u-player-bar" @click="adjust($event)">
          <div class="u-player-loaded" :style="{ width: Math.min(loaded / duration * 100, 100) + '%' }"></div>
          <div class="u-player-played" :style="{ width: Math.min(played / duration * 100, 100) + '%' }"></div>
        </div>
        <div class="u-player-tool">
          <button class="u-player-btn" @click="exit()">
            <svg style="margin: 5% auto 0" width="90%" height="90%" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff"
                    d="M953.653003 495.405043 768.424945 310.184575c-9.079145-9.078773-23.800007-9.078773-32.884269 0l-37.440215 37.438681c-9.079145 9.078773-9.079145 23.804149 0 32.882921l81.706161 81.702813L407.380563 462.20899c-12.838926 0-23.246376 10.408047-23.246376 23.246447l0 52.952003c0 12.842493 10.40745 23.251563 23.246376 23.251563l372.244928 0-81.706161 81.702813c-9.079145 9.077749-9.079145 23.804149 0 32.881898l37.445331 37.439704c9.079145 9.078773 23.805124 9.078773 32.884269 0L916.206648 565.731762c0-0.005117 0.005117-0.005117 0.005117-0.005117l37.445331-37.443797C962.731124 519.204076 962.731124 504.482793 953.653003 495.405043L953.653003 495.405043zM634.548497 64.021106 133.71476 64.021106c-38.519847 0-69.751408 31.230282-69.751408 69.74855l0 756.327658c0 38.524408 31.231561 69.749574 69.751408 69.749574l500.833737 0c38.52087 0 69.751408-31.225165 69.751408-69.749574l0-98.134041c0-12.837376-10.408474-23.251563-23.252516-23.251563l-50.396825 0c-12.837902 0-23.252516 10.414187-23.252516 23.251563l0 37.331233c-0.25379 19.037589-15.762631 34.398438-34.864447 34.398438L194.759522 863.692944c-19.257365 0-34.872634-15.615653-34.872634-34.877345L159.886888 194.241936c0-19.257599 15.609129-34.874275 34.872634-34.874275l377.774078 0c19.10591 0 34.610657 15.356756 34.864447 34.398438l0 38.431288c0 12.842493 10.414614 23.251563 23.252516 23.251563l50.396825 0c12.844042 0 23.252516-10.409071 23.252516-23.251563L704.299905 133.769656C704.299905 95.251388 673.068343 64.021106 634.548497 64.021106L634.548497 64.021106zM634.548497 64.021106"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="u-player-loading" v-show="loading">
        <div class="u-player-spin"></div>
      </div>
    </div>
  </popup>
</template>
<script>
  import enableInlineVideo from 'iphone-inline-video'

  export default {
    name: 'video',
    data () {
      return {
        visible: false,
        poster: '',
        src: '',
        state: 'pause',
        duration: 0,
        loaded: 0,
        played: 0,
        loop: true,
        loading: false
      }
    },
    watch: {
      visible (val) {
        const video = this.$refs.video
        if (!val && !video.paused) {
          video.currentTime = 0
          video.pause()
        }
      }
    },
    methods: {
      /**
       * 解析事件 转换为00:00的字符串
       * @param second
       * @returns {string}
       */
      secondToTime (second) {
        const add0 = (num) => {
          return num < 10 ? '0' + num : '' + num
        }
        const min = parseInt(second / 60)
        const sec = parseInt(second - min * 60)
        return add0(min) + ':' + add0(sec)
      },
      /**
       * 开关 切换播放或者暂时视频
       */
      switchVideo () {
        const video = this.$refs.video
        if (video.paused) {
          video.play()
        } else {
          video.pause()
        }
      },
      /**
       * 调整播放进度
       */
      adjust (e) {
        if (this.duration > 0) {
          this.$refs.video.currentTime = parseInt((e.clientX - 15) / (document.documentElement.clientWidth - 30) * this.duration)
        }
      },
      /**
       * 退出播放器
       */
      exit () {
        const video = this.$refs.video
        if (!video.paused) {
          video.currentTime = 0
          video.pause()
        }
        if (location.hash === '#$player') {
          history.back()
        }
        this.visible = false
      }
    },
    mounted () {
      const video = this.$refs.video
      // 获取视频总时长，loaded or changed
      video.addEventListener('durationchange', () => {
        // 兼容性处理 在某些安卓机下输入为1
        if (video.duration !== 1) {
          this.duration = parseInt(video.duration)
        }
      })
      // 获取视频缓冲长度
      video.addEventListener('progress', () => {
        this.loaded = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0
      })
      // 视频下载时发生了错误
      video.addEventListener('error', () => {
        if (this.visible) {
          this.exit()
          this.$toast('无法加载视频 ╥﹏╥')
        }
      })
      video.addEventListener('waiting', () => {
        if (this.visible) this.loading = true
      })
      video.addEventListener('playing', () => this.loading = false) // eslint-disable-line
      // 获取播放进度
      video.addEventListener('timeupdate', () => this.played = video.currentTime) // eslint-disable-line
      video.addEventListener('play', () => this.state = 'play') // eslint-disable-line
      video.addEventListener('pause', () => {
        this.loading = false
        this.state = 'pause'
      })
      video.addEventListener('ended', () => {
        if (!this.loop) {
          this.exit() // 没有循环播放 播放完毕后立即退出
        }
      })

      enableInlineVideo(video)
    }
  }
</script>
<style lang="scss" type="text/scss">
  .u-player {
    position: relative;
    height: 100%;
    font-size: 0;
    background-color: #000;
    &-video {
      position: relative;
      z-index: 1;
      display: block;
      width: 100%;
      height: 100%;
      -webkit-appearance: none;
    }
    &-controller {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        height: 98px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==') repeat-x bottom;
      }
    }
    &-btn {
      display: inline-block;
      width: 46px;
      height: 38px;
      padding: 7px;
      opacity: .8;
      vertical-align: middle;
      border: 0 none;
      background-color: transparent;
      outline: none;
      box-sizing: border-box;
    }
    &-tool {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 38px;
    }
    &-time {
      display: inline-block;
      line-height: 38px;
      color: #eee;
      font-size: 13px;
      text-shadow: 0 0 2px rgba(0, 0, 0, .5);
      vertical-align: middle;
    }
    &-bar {
      position: absolute;
      bottom: 41px;
      left: 15px;
      right: 15px;
      height: 3px;
      background-color: hsla(0, 0%, 100%, .2);
    }
    &-loaded,
    &-played {
      position: absolute;
      top: 0;
      left: 0;
      height: 3px;
      will-change: width;
    }
    &-loaded {
      z-index: 1;
      background-color: hsla(0, 0%, 100%, .4);
    }
    &-played {
      z-index: 2;
      background-color: rgb(250, 233, 163);
    }
    &-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 9;
      padding: 15px;
      text-align: center;
      background-color: rgba(0, 0, 0, .7);
      border-radius: 5px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    &-spin {
      display: inline-block;
      height: 24px;
      width: 24px;
      vertical-align: middle;
      border: 4px solid rgb(204, 204, 204);
      border-right-color: transparent;
      border-radius: 16px;
      -webkit-animation: fx-player-spin 0.8s infinite linear;
      animation: fx-player-spin 0.8s infinite linear;
    }
  }

  .u-player-video::-webkit-media-controls-start-playback-button,
  .IIV::-webkit-media-controls-play-button,
  .IIV::-webkit-media-controls-start-playback-button {
    opacity: 0;
    pointer-events: none;
    width: 5px;
  }

  @keyframes fx-player-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes fx-player-spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
