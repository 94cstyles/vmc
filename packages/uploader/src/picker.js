import noop from '../../../src/utils/noop'
import fileType from '../../../src/utils/fileType'

class Picker {
  constructor ({container, accept, callback = noop}) {
    this.container = container

    // 设置容器
    if (!/^(absolute|relative|fixed)$/.test(getComputedStyle(container, null).getPropertyValue('position'))) {
      container.style.position = 'relative'
    }

    // 文件类型限制
    let rule = /.*/i

    // 默认配置
    if (Object.prototype.toString.call(accept) === '[object String]') {
      accept = {
        'image': {
          extensions: 'jpg,png,gif,tif,bmp',
          mimeTypes: 'image/*'
        },
        'video': {
          extensions: 'mp4,m4v,mkv,webm,mov,avi,wmv,mpg',
          mimeTypes: 'player/*'
        },
        'audio': {
          extensions: 'mp3,m4a,opus,ogg,flac,wav,amr,mid',
          mimeTypes: 'music/*'
        }
      }[accept]
    }

    if (Object.prototype.toString.call(accept) === '[object Object]' && accept.extensions) {
      rule = new RegExp(`(${accept.extensions.split(',').map((v) => v).join('|').replace(/\*/g, '.*')})$`, 'i')
    }

    const listening = (e) => {
      const file = e.target.files[0]
      const newInput = this._create(accept)

      this.input.removeEventListener('change', listening) // 移除事件
      this.container.replaceChild(newInput, this.input) // 替换新的input file
      newInput.addEventListener('change', listening)
      this.input = newInput

      const reader = new FileReader()
      reader.addEventListener('load', (e) => {
        const info = fileType(e.target.result)
        if (info) {
          file.ext = info.ext
          file.mime = info.mime
        } else if (file.type) {
          file.ext = file.name.split('.').pop().toLowerCase()
          file.mime = file.type
        }
        if (file.ext && rule.test(file.ext)) {
          callback(null, file)
        } else {
          callback(new Error('文件格式错误，请上传正确的文件。'), null)
        }
      })
      reader.readAsArrayBuffer(file)
    }

    this.input = this._create(accept)
    this.input.addEventListener('change', listening)
    this.container.appendChild(this.input)
  }

  /**
   * 创建input file
   * @param accept
   * @returns {Element}
   * @private
   */
  _create (accept) {
    const input = document.createElement('input')
    // input设置
    input.setAttribute('type', 'file')
    input.style.position = 'absolute'
    input.style.top = 0
    input.style.left = 0
    input.style.zIndex = 100
    input.style.display = 'block'
    input.style.width = '100%'
    input.style.height = '100%'
    input.style.opacity = 0

    // 文件类型限制
    if (Object.prototype.toString.call(accept) === '[object Object]' && accept.mimeTypes) {
      input.setAttribute('accept', accept.mimeTypes)
    }

    return input
  }
}

export default Picker
