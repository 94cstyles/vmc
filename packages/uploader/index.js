import uploader from './src/uploader.vue'

export default function (Vue, options) {
  // 设置上传的默认参数
  uploader.mixins = [{
    created () {
      this.$config = Object.assign({
        host: location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com', // 上传接口地址
        token: '/uptoken', // 动态获取七牛上传token 如: http://jssdk.demo.qiniu.io/uptoken
        domain: 'http://7xocov.com1.z0.glb.clouddn.com', // 文件上传后的访问路径 如: http://7xocov.com1.z0.glb.clouddn.com/activity/{year}/{month}/{day}  {...}是内置占位符 会替换成当前日期对应值
        expired: 30 * 60 * 1000 // token缓存有效期30分钟
      }, options)
    }
  }]
  Vue.component(uploader.name, uploader)
}
