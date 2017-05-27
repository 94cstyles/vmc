<template>
  <div class="u-layout" :class="{ 'is-unHeader': $route.name === 'index' }">
    <header class="u-layout-header">
      <a class="u-layout-back" @click="$router.back()"></a>
      {{title}}
      <a v-if="$route.name !== 'doc'" class="u-layout-next" @click="next"></a>
    </header>
    <section class="u-layout-wrapper">
      <div class="u-layout-scroll">
        <slot></slot>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'layout',
    data () {
      return {
        title: document.title
      }
    },
    methods: {
      next () {
        this.$router.push(`/doc/${this.$route.name.replace(/ /g, '').toLowerCase()}`)
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  @import "../assets/compass";

  .u-layout {
    position: relative;
    height: 100%;
    &-header {
      position: relative;
      z-index: 2;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      background-color: #fff;
      border-bottom: 1px solid #d9d9d9;
      @include parent-status('.is-unHeader', '.u-layout') {
        display: none;
      }
    }
    &-next {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 60px;
      background: url("../assets/doc_icon.png") no-repeat center;
      background-size: 24px;
    }
    &-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 60px;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        border: 1px solid #666;
        border-top-width: 0;
        border-right-width: 0;
        -webkit-transform: translate(-50%, -50%) rotate(45deg);
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
    &-wrapper {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      @include parent-status('.is-unHeader', '.u-layout') {
        top: 0;
      }
    }
    &-scroll {
      position: relative;
      height: 100%;
      padding: 12px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      @include parent-status('.is-unHeader', '.u-layout') {
        padding: 0;
      }
    }
  }
</style>
