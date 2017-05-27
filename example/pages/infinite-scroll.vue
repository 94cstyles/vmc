<template>
  <layout>
    <ul v-infinite-scroll="loadData">
      <li v-for="(udf, index) in listData" style="height: 40px;line-height: 40px;text-align: center;">{{ index + 1 }}</li>
    </ul>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        listData: []
      }
    },
    methods: {
      loadData () {
        this.listData = this.listData.concat(new Array(20))
      }
    }
  }
</script>
<style>
</style>
