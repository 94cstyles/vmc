<template>
  <layout>
    <button @click="$actionsheet(sheet)" class="button">带取消按钮的操作菜单</button>
    <button @click="$actionsheet(sheet, '')" class="button">无取消按钮的操作菜单</button>
  </layout>
</template>
<script>

  export default {
    data () {
      return {
        sheet: [{
          'label': '拍照',
          'method': () => console.log('你点了拍照按钮')
        }, {
          'label': '从相册中选择',
          'method': () => console.log('你点了相册按钮')
        }]
      }
    }
  }
</script>
<style>
</style>
