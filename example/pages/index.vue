<template>
  <layout>
    <ul class="u-link">
      <li v-for="(page, index) in pages" :key="index">
        <router-link class="u-link-item" :to="page.path">{{page.name}}</router-link>
      </li>
    </ul>
  </layout>
</template>
<script>
  import pages from '../config.json'

  export default {
    data () {
      return {
        pages: pages
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .u-link {
    &-item {
      position: relative;
      display: block;
      padding: 0 20px;
      line-height: 48px;
      font-size: 16px;
      color: #000;
      text-decoration: none;
      border-bottom: 1px solid #d9d9d9;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 20px;
        width: 10px;
        height: 10px;
        border: 1px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        transform: translateY(-50%) rotate(45deg);
      }
    }
  }
</style>
