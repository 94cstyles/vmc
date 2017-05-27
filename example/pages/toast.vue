<template>
  <layout>
    <button @click="$toast('消息提示')" class="button">普通提示</button>
    <button @click="$toast('提交成功', true)" class="button">成功提示</button>
    <button @click="$toast('提交失败', false)" class="button">失败提示</button>
    <button @click="$toast({'message': '在底部的提示', 'position': 'bottom'})" class="button">自定义位置</button>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style>
</style>
