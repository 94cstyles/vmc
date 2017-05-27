import SUPPORT_PASSIVE from './supportPassive'
import css from './css'

const ANIMATION_EVENT = {
  'animation': 'animationend',
  'WebkitAnimation': 'webkitAnimationEnd',
  'MozAnimation': 'mozAnimationEnd',
  'OAnimation': 'oAnimationEnd',
  'msAnimation': 'MSAnimationEnd'
}

const TRANSITION_EVENT = {
  'transition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'mozTransitionEnd',
  'OTransition': 'oTransitionEnd',
  'msTransition': 'MSTransitionEnd'
}

export default {
  /**
   * 绑定事件
   * @param el {Element}
   * @param type {String} 事件名
   * @param callback {Function} 回调函数
   * @param options {undefined|Boolean|Object} 选项
   */
  on (el, type, callback, options) {
    type = this._eventType(type)

    if (Object.prototype.toString.call(options) === '[object Object]' && options.passive) {
      if (!SUPPORT_PASSIVE) delete options.passive
      el.addEventListener(type, callback, Object.keys(options).length > 0 ? options : false)
    } else {
      el.addEventListener(type, callback, options || false)
    }
  },

  /**
   * 解除事件绑定
   * @param el {Element}
   * @param type {String} 事件名
   * @param callback {Function} 回调函数
   */
  off (el, type, callback) {
    type = this._eventType(type)
    el.removeEventListener(type, callback)
  },

  /**
   * 绑定单次事件
   * @param el {Element}
   * @param type {String} 事件名
   * @param callback {Function} 回调函数
   * @param options {undefined|Boolean|Object} 选项
   */
  once (el, type, callback, options) {
    const func = (e) => {
      callback(e)
      this.off(el, type, func)
    }
    this.on(el, type, func, options)
  },

  /**
   * 获取正确的事件名
   * @param type {String}
   * @returns {String}
   * @private
   */
  _eventType (type) {
    if (type === 'transitionend') {
      return TRANSITION_EVENT[css(document.body, 'transition')]
    } else if (type === 'animationend') {
      return ANIMATION_EVENT[css(document.body, 'animation')]
    } else {
      return type
    }
  }
}
