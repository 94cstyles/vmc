<template>
  <popup v-model="visible" position="bottom" :destroy="true" :close-on-click-mask="cancel !== ''">
    <div class="u-actionSheet">
      <ul class="u-actionSheet-list">
        <li v-for="item in actions" class="u-actionSheet-item u-actionSheet-button" :class="item.className || ''" @click="itemClick(item)" v-html="item.label"></li>
      </ul>
      <a class="u-actionSheet-cancel u-actionSheet-button" @click.stop="visible = false" v-show="cancel">
        {{cancel}}
      </a>
    </div>
  </popup>
</template>
<script>
  export default {
    data () {
      return {
        visible: false,
        actions: [],
        cancel: '取消'
      }
    },
    methods: {
      itemClick (item) {
        if (item.method && typeof item.method === 'function') {
          item.method()
          this.visible = false
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .u-actionSheet {
    background-color: #e0e0e0;
    &-button {
      display: block;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      color: #333;
      background-color: #fff;
    }
    &-item {
      border-bottom: 1px solid #e0e0e0;
      .hairlines & {
        border-bottom-width: .5px;
      }
    }
    &-cancel {
      margin-top: 5px;
    }
    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
</style>
