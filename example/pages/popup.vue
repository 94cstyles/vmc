<template>
  <layout>
    <button @click="popupVisible1 = true" class="button">中部弹出</button>
    <button @click="popupVisible2 = true" class="button">上侧弹出</button>
    <button @click="popupVisible3 = true" class="button">右侧弹出</button>
    <button @click="popupVisible4 = true" class="button">下侧弹出</button>
    <button @click="popupVisible5 = true" class="button">左侧弹出</button>
    <popup v-model="popupVisible1">
      <div style="max-width: 80%;padding: 20px 0;margin: 0 auto;line-height: 20px;text-align: center;background-color: #fff;">
        我在中间弹出来了
      </div>
    </popup>
    <popup v-model="popupVisible2" position="top" :opacity="0">
      <div style="width: 100%;height: 60px;text-align: center;line-height: 60px;color: #fff;background-color: rgba(0, 0, 0, .7)">
        我从上面出来的
      </div>
    </popup>
    <popup v-model="popupVisible3" position="right" :opacity="0" :close-on-click-mask="false">
      <div style="width: 100%;height: 100%;background-color: #fff;">
        <button @click="popupVisible3 = false" class="button" style="position: absolute;top: 50%;left: 50%;max-width: 80%;transform: translate3d(-50%, -50%, 0);">
          关闭 popup
        </button>
      </div>
    </popup>
    <popup v-model="popupVisible4" position="bottom">
      <div style="width: 100%;height: 60px;text-align: center;line-height: 60px;background-color: #fff;">
        我从下面出来的
      </div>
    </popup>
    <popup v-model="popupVisible5" position="left" :opacity="0" :close-on-click-mask="false">
      <div style="width: 100%;height: 100%;background-color: #fff">
        <button @click="popupVisible5 = false" class="button" style="position: absolute;top: 50%;left: 50%;max-width: 80%;transform: translate3d(-50%, -50%, 0);">
          关闭 popup
        </button>
      </div>
    </popup>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        popupVisible1: false,
        popupVisible2: false,
        popupVisible3: false,
        popupVisible4: false,
        popupVisible5: false
      }
    },
    watch: {
      popupVisible2 (val) {
        if (val) {
          setTimeout(() => {
            this.popupVisible2 = false
          }, 2000)
        }
      }
    }
  }
</script>
<style>
</style>
