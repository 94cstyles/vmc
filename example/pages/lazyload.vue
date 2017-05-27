<template>
  <layout>
    <button @click="show" class="button">操作</button>
    <div class="u-images">
      <transition name="change">
        <ul v-if="queue === 1">
          <li v-for="n in count">
            <img data-width="400" :data-height="300 + (n * factor)"
                 v-lazy="'https://unsplash.it/400/'+ (300 + (n * factor))">
          </li>
        </ul>
      </transition>
      <transition name="change">
        <ul v-if="queue === 2">
          <li v-for="n in count" :style="{'padding': (((300 + (n * factor)) / 300 * 100).toFixed(4) + '% 0 0 0')}"
              v-lazy:background-image="'https://unsplash.it/300/'+ (300 + (n * factor))">
          </li>
        </ul>
      </transition>
    </div>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        queue: 1,
        count: 10,
        factor: 10
      }
    },
    methods: {
      show () {
        this.$actionsheet([{
          label: '切换队列',
          method: () => {
            this.queue = this.queue === 1 ? 2 : 1
          }
        }, {
          label: '添加图片',
          method: () => ++this.count
        }, {
          label: '刷新图片',
          method: () => {
            this.factor = this.factor === 10 ? 5 : 10
          }
        }, {
          label: '清除图片',
          method: () => {
            this.count = 0
          }
        }])
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .u-images {
    position: relative;
    .doc,
    ul {
      -webkit-transition: transform .4s ease;
      transition: transform .4s ease;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      &.change-leave-active,
      &.change-enter-active {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
      &.change-leave-active {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
      }
      &.change-enter {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
      }
    }
    li {
      padding: 6px;
      background-color: #fff;
      box-shadow: 0 0 4px #ccc;
      background-size: 100% auto;
      & + li {
        margin-top: 12px;
      }
    }
    img {
      display: block;
      width: 100%;
    }
  }
</style>
