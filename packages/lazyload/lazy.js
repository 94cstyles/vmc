import throttle from '../../src/utils/throttle'
import getScrollEventTarget from '../../src/utils/scrollEventTarget'
import DOMEvent from '../../src/utils/DOMEvent'
import SUPPORT_WEBP from '../../src/utils/supportWebp'

// 占位图
const PLACEHOLDER_URL = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='

class Lazy {
  constructor (options) {
    this.options = Object.assign({
      preload: 1.3, // 预加载高度的比例
      nextTick: (next) => setTimeout(next, 0), // 延迟执行
      filter: (photo) => photo.src // 路径过滤器
    }, options)
    this.listeners = []

    const effectLoadHandler = (e) => {
      this.listeners.forEach((target) => {
        if (target.el !== window && e.target.contains(target.el)) {
          target.handle()
        }
      })
    }

    DOMEvent.on(window, 'animationend', effectLoadHandler, {passive: true})
    DOMEvent.on(window, 'transitionend', effectLoadHandler, {passive: true})
  }

  add (type, el, {value, oldValue, arg, modifiers}) {
    // 防止重复触发
    if (type === 'update' && typeof oldValue !== 'undefined' && oldValue === value) return false
    // img默认图片
    if (arg !== 'background-image') el.setAttribute('src', PLACEHOLDER_URL)
    // 没有传递图片地址
    if (!value) return el.setAttribute('lazy', 'error')
    el.setAttribute('lazy', 'loading')

    // 图片信息
    const photo = {
      el: el,
      src: value,
      type: 'background-image',
      placeholder: false
    }

    // 预设图片高度
    if (arg !== 'background-image') {
      const w = el.getAttribute('data-width')
      const h = el.getAttribute('data-height')
      photo.type = 'image'

      if (/\d/.test(w) && /\d/.test(h)) {
        el.style.height = 0
        el.style.paddingTop = `${(parseInt(h) / parseInt(w) * 100).toFixed(4)}%`
        photo.placeholder = true
      }
    }

    // 立即显示图片
    // container的id不能叫active
    if (modifiers.active) {
      return this._render(photo)
    }

    this.options.nextTick(() => {
      if (!el.$parent) el.$parent = getScrollEventTarget(el)

      this._listen(el.$parent, photo)
      this.options.nextTick(() => {
        if (this._checkInView(photo.el)) {
          this._render(photo)
          this._unMount(photo.el)
        }
      })
    })
  }

  remove (el) {
    if (el.$parent) {
      this._unMount(el)
    }
  }

  _render (photo) {
    // 对文件路径进行处理
    const src = this.options.filter(photo, SUPPORT_WEBP)

    // 渲染结束处理
    const _ = (state) => {
      // 取消占位高度
      if (photo.placeholder) {
        photo.el.style.height = 'auto'
        photo.el.style.paddingTop = 0
        photo.placeholder = false
      }

      if (state === 'loaded') {
        if (photo.type === 'background-image') {
          photo.el.style.backgroundImage = `url('${src}')`
        } else {
          photo.el.setAttribute('src', src)
        }
      }
      photo.el.setAttribute('lazy', state)
    }

    // 加载并验证图片
    const img = new Image()
    img.src = src

    if (img.complete) {
      _('loaded')
    } else {
      img.addEventListener('load', () => _('loaded'))
      img.addEventListener('error', () => _('error'))
    }
  }

  _unMount (el) {
    const target = this.listeners.find((target) => target.el === el.$parent)
    if (!target) return

    // 移除已处理的图片
    for (let i = target.queue.length - 1; i >= 0; i--) {
      if (target.queue[i].el === el) {
        target.queue.splice(i, 1)
        break
      }
    }

    // 注销事件
    if (target.queue.length === 0 && target.listened) {
      target.listened = false
      DOMEvent.off(target.el, 'scroll', target.handle)
      DOMEvent.off(target.el, 'touchmove', target.handle)
    }
  }

  _checkInView (el) {
    const rect = el.getBoundingClientRect()
    return (rect.top < window.innerHeight * this.options.preload && rect.bottom > 0) && (rect.left < window.innerWidth * this.options.preload && rect.right > 0)
  }

  _listen (parentNode, photo) {
    let target = this.listeners.find((target) => target.el === parentNode)

    // 监听信息
    if (!target) {
      target = {
        el: parentNode,
        listened: false,
        queue: [],
        handle: throttle(() => {
          for (let i = target.queue.length - 1; i >= 0; i--) {
            const photo = target.queue[i]
            if (this._checkInView(photo.el)) {
              this._render(photo)
              this._unMount(photo.el)
            }
          }
        }, 200)
      }
      this.listeners.push(target)
    }

    // 开启事件监听
    if (!target.listened) {
      target.listened = true
      DOMEvent.on(parentNode, 'scroll', target.handle, {passive: true})
      DOMEvent.on(parentNode, 'touchmove', target.handle, {passive: true})
    }

    // 更新监听队列
    const _ = target.queue.find((o) => o.el === photo.el)
    if (_) {
      _.src = photo.src
    } else {
      target.queue.push(photo)
    }

    return target
  }
}

export default Lazy
