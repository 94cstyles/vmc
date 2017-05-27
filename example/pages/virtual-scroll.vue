<template>
  <layout>
    <virtual-scroll size="2rem" offset=".4rem" :remain="20" :preload="2" @toBottom="onBottom">
      <div v-for="(udf, index) of items" :key="index" :style="itemStyle(index)">
        {{index + 1}}
      </div>
    </virtual-scroll>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        items: new Array(200)
      }
    },
    methods: {
      onBottom () {
        this.items = this.items.concat(new Array(200))
      },
      itemStyle (index) {
        return {
          'height': '1rem',
          'margin-top': index === 0 ? '0' : '.4rem',
          'text-align': 'center',
          'line-height': '1rem'
        }
      }
    }
  }
</script>
<style>
</style>
