<template>
  <layout>
    <button @click="show()" class="button">普通的</button>
    <button @click="show('加载中...')" class="button">带文字的</button>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      show (text = '') {
        this.$indicator.open(text)
        setTimeout(() => {
          this.$indicator.close()
        }, 1000)
      }
    }
  }
</script>
<style>
</style>
