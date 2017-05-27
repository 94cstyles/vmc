import throttle from '../../src/utils/throttle'
import getScrollEventTarget from '../../src/utils/scrollEventTarget'
import getScrollTop from '../../src/utils/scrollTop'
import DOMEvent from '../../src/utils/DOMEvent'

class InfiniteScroll {
  constructor ({el, vm, handler}) {
    this.el = el
    this.vm = vm
    this.handler = handler
    this.scrollEventTarget = getScrollEventTarget(el)
    this.scrollListener = throttle(() => this.doCheck(), 200)
    DOMEvent.on(this.scrollEventTarget, 'scroll', this.scrollListener, {passive: true})

    // 监听禁用状态
    const disabledExpr = el.getAttribute('infinite-scroll-disabled')
    let disabled = false
    if (disabledExpr) {
      disabled = Boolean(this.vm[disabledExpr])
      this.vm.$watch(disabledExpr, (value) => {
        this.disabled = value
      })
    }
    this.disabled = disabled

    // 获取触发加载方法的滚动距离阈值 默认: 0px
    const distanceExpr = el.getAttribute('infinite-scroll-distance')
    let distance = 0
    if (distanceExpr) {
      distance = Number(this.vm[distanceExpr] || distanceExpr)
      if (isNaN(distance)) distance = 0
    }
    this.distance = distance

    // 是否需要检测内容是否撑满容器 默认: true
    const immediateCheckExpr = el.getAttribute('infinite-scroll-immediate-check')
    let immediateCheck = true
    if (immediateCheckExpr) {
      immediateCheck = Boolean(this.vm[immediateCheckExpr])
    }

    // 立即检测加载数据
    if (immediateCheck) this.vm.$nextTick(() => this.doCheck())

    // 通过事件监听触发检测
    const listenEventName = el.getAttribute('infinite-scroll-listen-for-event')
    if (listenEventName) {
      this.vm.$on(listenEventName, () => this.doCheck())
    }

    // 取消事件绑定
    this.vm.$on('infinite-scroll-destroy', () => this.destroy())
  }

  doCheck () {
    if (this.disabled) return // 检测被禁用
    const element = this.el
    const scrollEventTarget = this.scrollEventTarget
    const viewportScrollTop = getScrollTop(scrollEventTarget)
    const viewportBottom = viewportScrollTop + this._getVisibleHeight(scrollEventTarget)
    let shouldTrigger = false

    if (scrollEventTarget === element) {
      shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= this.distance
    } else {
      const elementBottom = this._getElementTop(element) - this._getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop

      shouldTrigger = viewportBottom + this.distance >= elementBottom
    }

    if (shouldTrigger && this.handler) {
      this.handler()
    }
  }

  destroy () {
    DOMEvent.off(this.scrollEventTarget, 'scroll', this.scrollListener)
  }

  _getVisibleHeight (el) {
    if (el === window) {
      return document.documentElement.clientHeight
    }

    return el.clientHeight
  }

  _getElementTop (el) {
    if (el === window) {
      return getScrollTop(window)
    }
    return el.getBoundingClientRect().top + getScrollTop(window)
  }
}

export default InfiniteScroll
