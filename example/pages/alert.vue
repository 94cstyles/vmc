<template>
  <layout>
    <button @click="$alert('操作成功!')" class="button">提示框</button>
    <button @click="confirm" class="button">确认弹出框</button>
    <button @click="prompt" class="button">输入弹出框</button>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      confirm () {
        this.$confirm('确定执行此操作?').then(() => {
          this.$toast({
            'message': '你点了确定按钮',
            'position': 'bottom'
          })
        })
      },
      prompt () {
        this.$prompt('请输入你的姓名').then((value) => {
          if (value) {
            this.$alert({
              'title': '输入成功',
              'message': `你的名字是:${value}`
            })
          }
        })
      }
    }
  }
</script>
<style>
</style>
