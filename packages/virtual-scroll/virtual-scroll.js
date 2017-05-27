import throttle from '../../src/utils/throttle'
import getScrollEventTarget from '../../src/utils/scrollEventTarget'
import getScrollTop from '../../src/utils/scrollTop'
import DOMEvent from '../../src/utils/DOMEvent'

export default {
  name: 'virtual-scroll',
  render (createElement) {
    const slots = this.$slots.default ? this.filter(this.$slots.default) : []

    return createElement('div', [
      createElement('div', {
        'style': {
          'padding-top': this.paddingTop + 'px',
          'padding-bottom': (this.allPadding - this.paddingTop) + 'px'
        }
      }, slots)
    ])
  },
  props: {
    size: {
      type: [String, Number],
      required: true
    },
    offset: {
      type: [String, Number],
      default: 0
    },
    preload: {
      type: Number,
      default: 0
    },
    remain: {
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      slotSize: 0,
      slotOffset: 0,
      start: 0,
      end: 0,
      total: 0,
      viewTop: 0,
      viewHeight: 0,
      allPadding: 0,
      paddingTop: 0
    }
  },
  methods: {
    toPX (value) {
      if (/rem$/.test(value)) {
        const rem = Number(getComputedStyle(document.documentElement, null).getPropertyValue('font-size').replace('px', ''))
        return (Number(value.replace(/rem$/, '')) * rem)
      } else if (/vw$/.test(value)) {
        return Number(value.replace(/vw$/, '') * document.documentElement.clientWidth / 100)
      } else if (/vh$/.test(value)) {
        return Number(value.replace(/vh$/, '') * document.documentElement.clientHeight / 100)
      } else {
        return Number(('' + value).replace(/px$/, ''))
      }
    },
    getViewTop () {
      const top = this.$el.getBoundingClientRect().top - (this.scrollEventTarget !== window ? this.scrollEventTarget.getBoundingClientRect().top : 0)
      const scrollTop = this.$el !== this.scrollEventTarget ? getScrollTop(this.scrollEventTarget) : 0

      return top + scrollTop
    },
    getVisibleHeight (el) {
      if (el === window) {
        return document.documentElement.clientHeight
      }

      return el.clientHeight
    },
    filter (slots) {
      if (slots.length === 0) return []
      const len = Math.min(slots.length, this.remain)
      const scrollHeight = this.slotSize * slots.length + this.slotOffset * Math.max(slots.length - 1, 0)
      const contentHeight = this.slotSize * len + this.slotOffset * Math.max(len - 1, 0)

      this.total = slots.length
      this.allPadding = scrollHeight - contentHeight
      this.paddingTop = this.slotSize * this.start + this.slotOffset * this.start

      return slots.filter((slot, index) => index >= this.start && index <= this.end)
    },
    onScroll () {
      if (this.total === 0) return
      const scrollTop = Math.max(getScrollTop(this.scrollEventTarget) - this.viewTop, 0)
      const overs = Math.floor((scrollTop + this.slotOffset) / (this.slotSize + this.slotOffset))
      let start = Math.max(overs - this.preload, 0)
      let end = start + this.remain - 1

      if (end >= this.total) {
        end = this.total
        start = Math.max(this.total - this.remain, 0)
        if (!this.disabled) this.$emit('toBottom')
      }
      this.end = end
      this.start = start

      this.$forceUpdate() // 重新渲染
    },
    onResize () {
      this.viewTop = this.getViewTop()
      this.viewHeight = this.scrollEventTarget === window ? document.documentElement.clientHeight : this.scrollEventTarget.clientHeight
      this.slotSize = this.toPX(this.size)
      this.slotOffset = this.toPX(this.offset)
      this.onScroll()
    }
  },
  created () {
    this.slotSize = this.toPX(this.size)
    this.slotOffset = this.toPX(this.offset)
    this.end = this.remain - 1
  },
  mounted () {
    this.scrollEventTarget = getScrollEventTarget(this.$el)
    this.scrollListener = () => this.onScroll()
    this.resizeListener = throttle(() => this.onResize(), 200)
    this.viewTop = this.getViewTop()
    this.viewHeight = this.getVisibleHeight(this.scrollEventTarget)
    DOMEvent.on(this.scrollEventTarget, 'scroll', this.scrollListener, {passive: true})
    DOMEvent.on(window, 'resize', this.resizeListener)
  },
  beforeDestroy () {
    DOMEvent.off(this.scrollEventTarget, 'scroll', this.scrollListener)
    DOMEvent.off(window, 'resize', this.resizeListener)
  }
}
