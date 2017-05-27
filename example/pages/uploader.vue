<template>
  <layout>
    <uploader v-model="fileSrc">
      <button class="button">上传所有文件</button>
    </uploader>
    <div v-show="fileSrc" class="u-uploader-text">{{fileSrc}}</div>

    <uploader :uploaded="uploaded" :accept="accept" :options="options">
      <button class="button">上传200*100的图片</button>
    </uploader>
    <img v-if="imageSrc" :src="imageSrc" class="u-uploader-image">
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        accept: {extensions: 'jpg,png', mimeTypes: 'images/*'},
        options: {
          cropWidth: 200,
          cropHeight: 100
        },
        fileSrc: '',
        imageSrc: ''
      }
    },
    methods: {
      uploaded (src) {
        this.imageSrc = src
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .u-uploader-text {
    padding: 5px 10px;
    margin-bottom: 20px;
    line-height: 1.4;
    background-color: #fff;
    box-shadow: 0 0 4px #ccc;
    -webkit-user-select: text;
    user-select: text;
  }

  .u-uploader-image {
    width: 100%;
    border: 10px solid #fff;
    box-sizing: border-box;
    box-shadow: 0 0 4px #ccc;
  }
</style>
