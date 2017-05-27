const ctx = '@@audio'

export default {
  bind (el, {value, modifiers}, {context}) {
    el[ctx] = {
      src: value,
      handler () {
        context.$music.play({
          el,
          src: el[ctx].src,
          loop: modifiers.loop
        })
      }
    }
    el.addEventListener('click', el[ctx].handler)
  },
  update (el, {value}) {
    if (el[ctx]) {
      el[ctx].src = value
    }
  },
  unbind (el) {
    if (el[ctx]) {
      el.removeEventListener('click', el[ctx].handler)
      el[ctx] = null
    }
  }
}
