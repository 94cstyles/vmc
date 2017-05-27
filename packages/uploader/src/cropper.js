import SUPPORT_ONLY_TOUCH from '../../../src/utils/supportOnlyTouch'
import DOMEvent from '../../../src/utils/DOMEvent'
import dataURItoBlob from '../../../src/utils/dataURItoBlob'

class CropImage {
  constructor (quality = 100) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.quality = quality
    this.images = {
      n: null, // 原图
      e: null, // 90度的图
      s: null, // 180度的图
      w: null // 270度的图
    }
    this.key = 'n' // 图片方位key
    this.angle = 0 // 图片当前旋转角度
  }

  get () {
    return this.images[this.key] // 获取图片
  }

  /**
   * 读取文件
   * @param file {File|DataURL}
   * @param key {String}
   * @returns {Promise}
   */
  reader (file, key = 'n') {
    return new Promise((resolve, reject) => {
      const image = new Image()
      if (Object.prototype.toString.call(file) === '[object String]') {
        image.src = file
      } else {
        this.images = Object.assign(this.images, {
          name: file.name,
          ext: file.ext,
          type: file.mime || file.type
        })

        // 用FileReader读取file
        const reader = new FileReader()
        reader.addEventListener('load', (e) => {
          image.src = e.target.result
        })
        reader.readAsDataURL(file)
      }

      image.addEventListener('load', () => {
        this.images[key] = image
        resolve()
      })
      image.addEventListener('error', (e) => reject(e))
    })
  }

  /**
   * 对图片进行旋转
   * @returns {Promise}
   */
  rotate () {
    return new Promise((resolve, reject) => {
      if (this.images.n) {
        this.angle = (this.angle + 90) % 360 // 每次旋转90度 所以只有4个角度的图 0度 90度 180度 270度
        this.key = {0: 'n', 90: 'e', 180: 's', 270: '2'}[this.angle] // 对应key：n e s w

        if (this.images[this.key]) {
          // 如果有缓存 直接返回
          resolve()
        } else {
          // 根据旋转角度重新获得宽高
          const width = /^0|180$/.test(this.angle) ? this.images.n.width : this.images.n.height
          const height = /^0|180$/.test(this.angle) ? this.images.n.height : this.images.n.width

          // 使用canvas.toDataURL重新获取图片
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.canvas.width = width
          this.canvas.height = height
          this.ctx.rotate(this.angle * Math.PI / 180)
          this.ctx.drawImage(this.images.n, this.angle === 180 ? -width : this.angle === 270 ? -height : 0, this.angle === 90 ? -width : this.angle === 180 ? -height : 0)

          this.reader(this.canvas.toDataURL(this.images.mime, 1), this.key).then(resolve).catch(reject)
        }
      } else {
        reject(new Error('原图丢失'))
      }
    })
  }

  /**
   * 图片图片进行采集 返回Blob
   * @param sourceX {Number}
   * @param sourceY {Number}
   * @param sourceWidth {Number}
   * @param sourceHeight {Number}
   * @param cropWidth {Number}
   * @param cropHeight {Number}
   * @returns {Promise}
   */
  crop (sourceX, sourceY, sourceWidth, sourceHeight, cropWidth, cropHeight) {
    return new Promise((resolve, reject) => {
      if (this.images && this.images[this.key]) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.width = cropWidth
        this.canvas.height = cropHeight
        this.ctx.drawImage(this.images[this.key], sourceX, sourceY, sourceWidth, sourceHeight)
        const blob = dataURItoBlob(this.canvas.toDataURL(this.mime, this.quality))
        blob.name = this.images.name
        blob.ext = this.images.ext
        resolve(blob)
      } else {
        reject(new Error('原图丢失'))
      }
    })
  }
}

class Cropper {
  constructor (canvas, options) {
    this.options = Object.assign({
      cropWidth: 200, // 裁剪大小
      cropHeight: 200, // 裁剪大小
      zoomRatio: 0.1, // 缩放比
      quality: 100, // 裁剪后图片质量 [1 - 100]
      gap: 20, // 缩放触发值
      borderSize: 1, // 裁剪区域border大小
      borderColor: '#fff', // 裁剪区域border颜色
      background: 'rgba(0,0,0,.8)' // 遮罩层颜色
    }, options)
    this.options.cropRatio = this.options.cropWidth / this.options.cropHeight // 裁剪比
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.eventCache = {
      touchStart: this._onTouchStart.bind(this),
      touchMove: this._onTouchMove.bind(this),
      touchEnd: this._onTouchEnd.bind(this),
      resize: this._onResize.bind(this)
    }
    this.loading = false
    this.config = {}

    this._listener(true)
    this._onResize()
  }

  setFile (file) {
    this.loading = true
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)  // 清除画布
    this.file = new CropImage(this.options.quality)
    this.file.reader(file).then(() => {
      this.loading = false
      this._reset()
      this._draw()
    })
  }

  rotate () {
    this.loading = true
    this.file.rotate().then(() => {
      this.loading = false
      this._reset()
      this._draw()
    })
  }

  zoom (inOut) {
    if (!this.file) return
    const width = this.config.image.width
    const height = this.config.image.height
    const ratio = inOut ? 1 + this.options.zoomRatio : 1 / (1 + this.options.zoomRatio)

    // 重新计算放大缩小后的宽高以及xy
    this.config.image.width = Math.round(width * ratio)
    this.config.image.height = Math.round(height * ratio)
    this.config.image.x -= Math.floor((this.config.image.width - width) / 2)
    this.config.image.y -= Math.floor((this.config.image.height - height) / 2)

    this._draw()
  }

  crop () {
    return new Promise((resolve) => {
      const image = this.config.image
      const area = this.config.area
      const widthRatio = this.options.cropWidth / area.width
      const heightRatio = this.options.cropHeight / area.height
      const sourceX = Math.floor((image.x - area.x) * widthRatio)
      const sourceY = Math.floor((image.y - area.y) * heightRatio)
      const sourceWidth = Math.round(image.width * widthRatio)
      const sourceHeight = Math.round(image.height * heightRatio)

      this.loading = true
      this.file.crop(sourceX, sourceY, sourceWidth, sourceHeight, this.options.cropWidth, this.options.cropHeight)
        .then((file) => {
          this.loading = false
          resolve(file)
        })
    })
  }

  destroy () {
    this.file = null
    this._listener(false)
  }

  _listener (bind) {
    const attr = bind ? 'on' : 'off'

    DOMEvent[attr](this.canvas, SUPPORT_ONLY_TOUCH ? 'touchstart' : 'mousedown', this.eventCache.touchStart)
    DOMEvent[attr](this.canvas, SUPPORT_ONLY_TOUCH ? 'touchmove' : 'mousemove', this.eventCache.touchMove)
    DOMEvent[attr](SUPPORT_ONLY_TOUCH ? this.canvas : window, SUPPORT_ONLY_TOUCH ? 'touchend' : 'mouseup', this.eventCache.touchEnd)
    if (SUPPORT_ONLY_TOUCH) DOMEvent[attr](this.canvas, 'touchcancel', this.eventCache.touchEnd)
    DOMEvent[attr](window, 'resize', this.eventCache.resize)
  }

  _reset () {
    if (!this.file) return false

    const image = this.file.get()

    this.config.image = {
      x: 0, // 图片在画布中x值
      y: 0, // 图片在画布中y值
      width: 0, // 当前图片宽度
      height: 0, // 当前图片宽度
      ratio: image.width / image.height // 原图宽高比
    }

    // 重置图片及大小
    if (image.width > this.canvas.width) {
      this.config.image.width = this.canvas.width
      this.config.image.height = this.canvas.width / this.config.image.ratio
    } else if (image.width < this.config.area.width) {
      this.config.image.width = this.config.area.width
      this.config.image.height = this.config.area.width / this.config.image.ratio
    }

    if (image.height > this.canvas.height) {
      this.config.image.height = this.canvas.height
      this.config.image.width = this.canvas.height * this.config.image.ratio
    } else if (image.height < this.config.area.height) {
      this.config.image.height = this.config.area.height
      this.config.image.width = this.config.area.height * this.config.image.ratio
    }
    this.config.image.width = Math.round(this.config.image.width)
    this.config.image.height = Math.round(this.config.image.height)
    this.config.image.x = Math.floor((this.canvas.width - this.config.image.width) / 2)
    this.config.image.y = Math.floor((this.canvas.height - this.config.image.height) / 2)
  }

  _verifyConfig () {
    // 验证config数据是否复合规则 并 修正
    // 由于小数点问题导致最后可能会出现1px的误差 所以在极限值+1
    if (this.config.image.x + this.config.image.width < this.config.area.x + this.config.area.width + 1) {
      this.config.image.x = this.config.area.x + this.config.area.width - this.config.image.width + 1
    }

    if (this.config.image.x > this.config.area.x) {
      this.config.image.x = this.config.area.x
    }

    if (this.config.image.y + this.config.image.height < this.config.area.y + this.config.area.height + 1) {
      this.config.image.y = this.config.area.y + this.config.area.height - this.config.image.height + 1
    }

    if (this.config.image.y > this.config.area.y) {
      this.config.image.y = this.config.area.y
    }

    if (this.config.image.width < this.config.area.width) {
      this.config.image.width = this.config.area.width
      this.config.image.height = Math.round(this.config.area.width / this.config.image.ratio)
    }

    if (this.config.image.height < this.config.area.height) {
      this.config.image.height = this.config.area.height
      this.config.image.width = Math.round(this.config.area.height * this.config.image.ratio)
    }
  }

  _draw () {
    if (!this.file) return false
    const image = this.file.get()

    // 验证并修正
    this._verifyConfig()
    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 绘制图
    this.ctx.drawImage(image, this.config.image.x, this.config.image.y, this.config.image.width, this.config.image.height)
    // 绘制遮罩层
    this.ctx.save()
    this.ctx.fillStyle = this.options.background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.restore()
    // 绘制裁剪区域
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.options.borderColor
    this.ctx.lineWidth = this.options.borderSize
    this.ctx.rect(this.config.area.x, this.config.area.y, this.config.area.width, this.config.area.height)
    if (this.options.borderSize > 0) this.ctx.stroke()
    this.ctx.clip()
    // 补充绘制图
    this.ctx.drawImage(image, this.config.image.x, this.config.image.y, this.config.image.width, this.config.image.height)
    this.ctx.restore()
  }

  _getEventXY (e) {
    return (e.touches ? Array.prototype.slice.call(e.touches) : [e]).map((obj) => {
      return {
        x: obj.screenX,
        y: obj.screenY
      }
    })
  }

  _getTouchDistance (touch) {
    return touch.length === 2 ? Math.sqrt((touch[1].x - touch[0].x) * (touch[1].x - touch[0].x) + (touch[1].y - touch[0].y) * (touch[1].y - touch[0].y)) : 0
  }

  _onTouchStart (e) {
    e.stopPropagation()
    e.preventDefault()
    if (!this.file || (e.touches && e.touches.length > 2)) return // 只允许2个手指和1个手指操作
    const points = this._getEventXY(e)
    this.touch = {
      state: true,
      points: points,
      distance: this._getTouchDistance(points)
    }
  }

  _onTouchMove (e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.touch.state) {
      setTimeout(() => {
        const points = this._getEventXY(e)
        if (!e.touches || (e.touches.length === 1)) { // drag
          this.config.image.x += points[0].x - this.touch.points[0].x
          this.config.image.y += points[0].y - this.touch.points[0].y
          this.touch.points[0].x = points[0].x
          this.touch.points[0].y = points[0].y
          this._draw()
        } else { // zoom
          const displace = this._getTouchDistance(points) - this.touch.distance
          if (Math.abs(displace) > this.options.gap) { // 每当间距差到达设置值就触发zoom
            this.touch.distance += displace
            this.zoom(displace > 0)
          }
        }
      }, 0)
    }
  }

  _onTouchEnd () {
    if (!this.touch.state) return
    this.touch.state = false
  }

  _onResize () {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    let areaWidth = (width < height ? width : height) * 0.7
    let areaHeight = areaWidth / this.options.cropRatio

    if (areaHeight > height * 0.6) {
      areaHeight = height * 0.6
      areaWidth = areaHeight * this.options.cropRatio
    }

    // 保持数值的整数性
    areaWidth = Math.round(areaWidth)
    areaHeight = Math.round(areaHeight)

    // 设置canvas大小
    this.canvas.width = width
    this.canvas.height = height

    // 设置配置
    this.config.area = {
      x: Math.floor(width / 2 - (areaWidth / 2)),
      y: Math.floor(height / 2 - (areaHeight / 2)),
      width: areaWidth,
      height: areaHeight
    }
    this.touch = {
      state: false,
      points: null, // 当前手势各自位置
      distance: 0 // 当前2手指间距
    }

    // 绘制
    this._reset()
    this._draw()
  }
}

export default Cropper
