<template>
  <layout>
    <div v-outerTouch="onOuterTouch" :style="styles()">
      你点我没反应
    </div>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        color: 'red'
      }
    },
    methods: {
      onOuterTouch () {
        this.color = this.color === 'red' ? 'blue' : 'red'
      },
      styles () {
        return {
          'width': '200px',
          'height': '200px',
          'margin': '0 auto',
          'line-height': '200px',
          'text-align': 'center',
          'color': '#fff',
          'background-color': this.color
        }
      }
    }
  }
</script>
<style>
</style>
