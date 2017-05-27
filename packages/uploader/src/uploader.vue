<template>
  <div>
    <slot></slot>
    <template v-if="options">
      <popup v-model="visible" position="right" :opacity="0" :close-on-click-mask="false">
        <div class="u-crop">
          <header class="u-crop__head">
            <a class="u-crop__action s-zoomIn" title="放大" @click="cropper.zoom(true)"></a>
            <a class="u-crop__action s-zoomOut" title="缩小" @click="cropper.zoom(false)"></a>
            <a class="u-crop__action s-rotate" title="旋转" @click="cropper.rotate()"></a>
          </header>
          <canvas class="u-crop__canvas" ref="canvas"></canvas>
          <div class="u-crop__loading" v-show="cropper.loading">
            <ul class="u-crop__spinner">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <footer class="u-crop__foot">
            <a class="u-crop__button" @click="visible = false">取消</a>
            <a class="u-crop__button s-done" @click="cropImage()">确定</a>
          </footer>
        </div>
      </popup>
    </template>
  </div>
</template>
<script>
  import Picker from './picker'
  import Cropper from './cropper'
  import guid from '../../../src/utils/guid'
  import storage from '../../../src/utils/storage'

  export default {
    name: 'uploader',
    props: {
      value: {
        type: String,
        default: ''
      },
      // 文件选择类型设置 ['image', 'player', 'music', {extensions:'', mimeTypes: ''}]
      accept: {
        type: [Object, String],
        default: ''
      },
      // 对图片裁剪的配置
      options: {
        type: Object,
        default: () => null
      },
      // 文件上传后的访问路径
      domain: {
        type: String,
        default: ''
      },
      // 文件上传前，处理相关的事情
      beforeUpload: {
        type: Function,
        default: null
      },
      // 文件上传成功后，处理相关的事情
      uploaded: {
        type: Function,
        default: null
      }
    },
    data () {
      return {
        visible: false,
        cropper: {},
        parser: null
      }
    },
    methods: {
      /**
       * URL安全的Base64编码
       * @param str {String}
       * @returns {String}
       */
      URLSafeBase64Encode (str) {
        const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        const arr = []
        let o1, o2, o3, h1, h2, h3, h4, bits
        let i = 0
        let ac = 0
        let enc = ''

        if (!str) return str

        do { // pack three octets into four hexets
          o1 = str.charCodeAt(i++)
          o2 = str.charCodeAt(i++)
          o3 = str.charCodeAt(i++)

          bits = o1 << 16 | o2 << 8 | o3

          h1 = bits >> 18 & 0x3f
          h2 = bits >> 12 & 0x3f
          h3 = bits >> 6 & 0x3f
          h4 = bits & 0x3f

          // use hexets to index into b64, and append result to encoded string
          arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
        } while (i < str.length)

        enc = arr.join('')

        switch (str.length % 3) {
          case 1:
            enc = enc.slice(0, -2) + '=='
            break
          case 2:
            enc = enc.slice(0, -1) + '='
            break
        }

        return enc.replace(/\//g, '_').replace(/\+/g, '-')
      },
      /**
       * 获取七牛上传token
       * @returns {Promise}
       */
      getQiNiuToken () {
        return new Promise((resolve, reject) => {
          const token = storage.getItem('QINIU_UPLOAD_TOKEN')
          if (token) {
            resolve(token)
          } else {
            this.$http.get(this.$config.token)
              .then(({data}) => {
                if (data.uptoken) {
                  storage.setItem('QINIU_UPLOAD_TOKEN', data.uptoken, this.$config.expired)
                  resolve(data.uptoken)
                } else {
                  reject(new Error('获取上传token接口格式错误。'))
                }
              })
              .catch(() => reject(new Error('连接上传token接口失败。')))
          }
        })
      },
      /**
       * 上传完成
       * @param data
       */
      done (data) {
        this.$indicator.close()
        const url = `${this.parser.protocol}//${this.parser.host}/${data.key}`
        this.$emit('input', url)
        if (Object.prototype.toString.call(this.uploaded) === '[object Function]') this.uploaded(url)
      },
      /**
       * formData上传
       * @param data
       */
      formDataUpload (data) {
        const formData = new FormData()
        for (const key in data) {
          formData.append(key, data[key])
        }
        this.$http.post(this.$config.host, formData, {
          onUploadProgress: (e) => this.$indicator.open(`正在上传...${Math.min(Math.round(e.loaded / e.total * 100), 100)}%`)
        }).then(({data}) => this.done(data))
      },
      /**
       * 获取分片信息
       */
      chunkInfo (file, key, name) {
        const DEFAULT = {
          key,
          name,
          index: 0,
          loaded: 0,
          ctx: []
        }
        const has = Object.prototype.toString.call(file) === '[object File]'
        let storage = has ? storage.getItem(file.name) : DEFAULT // [object Blob] 裁剪的图片不支持断点续传

        // 校验文件是否发生了变化
        if (has && (storage === null || storage.size !== file.size || storage.lastModified !== file.lastModified)) {
          storage = Object.assign(DEFAULT, {
            size: file.size,
            lastModified: file.lastModified
          })
        }

        return storage
      },
      /**
       * 分片上传 断点续传
       * @param file
       * @param key
       * @param name
       * @param token
       */
      chunkUpload ({file, key, name, token}) {
        const storage = this.chunkInfo(file, key, name)
        const blockSize = 4 * 1024 * 1024 // 以4m为一个分片
        const blockCount = Math.ceil(file.size / blockSize)   // 总片数
        const promises = [] // 分片上传

        for (let i = storage.index; i < blockCount; i++) {
          // 计算每一片的起始与结束位置
          const start = i * blockSize
          const end = Math.min(file.size, start + blockSize)
          const chunkBlob = blockCount === 1 ? file : file.slice(start, end)
          const chunkSize = blockCount === 1 ? file.size : i + 1 === blockCount ? file.size - i * blockSize : blockSize

          // 创建块 并 上传片
          promises.push(() => {
            return new Promise((resolve, reject) => {
              this.$http.post(`${this.$config.host}/mkblk/${chunkSize}?name=${storage.name}&chunk=${i}&chunks=${blockCount}`, chunkBlob, {
                onUploadProgress: (e) => this.$indicator.open(`正在上传...${Math.min(Math.round((e.loaded + storage.loaded) / file.size * 100), 100)}%`),
                headers: {
                  'Content-Type': 'application/octet-stream',
                  'Authorization': `UpToken ${token}`
                }
              }).then(({data}) => {
                storage.loaded += chunkSize
                storage.index++
                storage.ctx.push(data.ctx)
                storage.setItem(file.name, storage, 10 * 60 * 1000) // 分片信息只保留10分钟

                resolve()
              }).catch(() => {
                reject(new Error(`上传分片 ${i + 1} 失败。`))
              })
            })
          })
        }

        Promise.series(promises).then(() => {
          // 创建文件
          this.$http.post(`${this.$config.host}/mkfile/${file.size}/key/${this.URLSafeBase64Encode(storage.key)}`, storage.ctx.join(','), {
            headers: {
              'Content-Type': 'text/plain',
              'Authorization': `UpToken ${token}`
            }
          }).then(({data}) => {
            this.done(data)
            this.$toast('上传成功', true)
            storage.removeItem(file.name) // 删除记录
          }).catch(() => {
            this.$indicator.close()
            this.$toast('上传失败', false)
            storage.removeItem(file.name) // 删除记录
          })
        }).catch((e) => {
          this.$indicator.close()
          this.$toast(e.message, false)
        }) // 执行上传
      },
      /**
       * 上传文件
       * @param file
       */
      upload (file) {
        const name = `${guid()}.${file.ext}` // 为资源生成一个随机名
        const pathname = this.parser.pathname.replace(/^\//, '')
        const key = pathname ? `${pathname}/${name}` : name // 上传路径

        this.$indicator.open('正在上传...0%')

        // 七牛上传
        if (/(up\.qbox\.me|upload\.qiniu\.com)/.test(this.$config.host)) {
          this.getQiNiuToken().then((token) => {
            if (file.size <= 4 * 1024 * 1024) {
              this.formDataUpload({key, token, file}) // 文件体积小于2M 直接使用formData上传
            } else {
              this.chunkUpload({key, name, token, file}) // 文件体积大于2M 使用分片上传
            }
          }).catch((e) => this.$toast(e.message))
        } else {
          this.formDataUpload({key, file})
        }
      },
      /**
       * 裁剪图片
       */
      cropImage () {
        this.cropper.crop().then((file) => {
          this.visible = false
          this.upload(file)
        })
      }
    },
    created () {
      const date = new Date()
      const href = this.domain || this.$config.domain

      this.parser = document.createElement('a')

      // 格式化路径
      if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(href)) throw new Error('请使用纯英文的路径')
      this.parser.href = href.replace(/\/$/, '').replace('{year}', date.getFullYear()).replace('{month}', date.getMonth() + 1).replace('{day}', date.getDay())
    },
    mounted () {
      this.picker = new Picker({
        container: this.$el,
        accept: this.accept,
        callback: (err, file) => {
          if (err) return this.$toast(err.message)

          const _ = () => {
            if (/image\//.test(file.mime) && this.options) { // 对图片进行裁剪上传
              this.visible = true
              this.cropper.setFile(file)
            } else { // 直接上传文件
              this.upload(file)
            }
          }

          Object.prototype.toString.call(this.beforeUpload) === '[object Function]' ? this.beforeUpload(file, _) : _() // eslint-disable-line no-unused-expressions
        }
      })
      this.$nextTick(() => {
        if (this.options) this.cropper = new Cropper(this.$refs.canvas, this.options)
      })
    },
    beforeDestroy () {
      if (this.cropper.destroy) this.cropper.destroy()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .u-crop {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    &__head {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      text-align: center;
      font-size: 0;
    }
    &__action {
      display: inline-block;
      width: 60px;
      height: 40px;
      margin: 0 20px;
      background: url("../../../src/assets/crop_icons.png") no-repeat;
      background-size: 228px 20px;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      &.s-zoomIn {
        background-position: 20px 10px;
      }
      &.s-zoomOut {
        background-position: -85px 10px;
      }
      &.s-rotate {
        background-position: -189px 10px;
      }
    }
    &__canvas {
      width: 100%;
      height: 100%;
    }
    &__foot {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      padding: 10px 0;
      text-align: center;
      font-size: 0;
      opacity: .8;
    }
    &__button {
      display: inline-block;
      width: 120px;
      margin: 0 5px;
      text-align: center;
      line-height: 32px;
      font-size: 14px;
      color: #fff;
      border: 1px solid #fff;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      vertical-align: middle;
      &.s-done {
        color: #3f3f3f;
        background-color: #fff;
      }
    }
    &__loading {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
    }
    &__spinner {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 60px;
      margin-top: -30px;
      padding-left: 0;
      text-align: center;
      font-size: 0;
      > li {
        background-color: #fff;
        height: 100%;
        width: 6px;
        display: inline-block;
        margin: 0 2px;

        -webkit-animation: fx-uploader-loading 1.2s infinite ease-in-out;
        animation: fx-uploader-loading 1.2s infinite ease-in-out;
        &:nth-child(2) {
          -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s;
        }
        &:nth-child(3) {
          -webkit-animation-delay: -1.0s;
          animation-delay: -1.0s;
        }
        &:nth-child(4) {
          -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s;
        }
        &:nth-child(5) {
          -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s;
        }
      }
    }
  }

  @-webkit-keyframes fx-uploader-loading {
    0%, 40%, 100% {
      -webkit-transform: scaleY(0.4)
    }
    20% {
      -webkit-transform: scaleY(1.0)
    }
  }

  @keyframes fx-uploader-loading {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
</style>
