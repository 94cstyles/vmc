let AUDIO

export default {
  play ({el, src, loop}) {
    if (this.el && el !== this.el) {
      this.el.classList.remove('is-loading')
      this.el.classList.remove('is-play')
      this.el.classList.remove('is-pause')
    }

    this.el = el

    if (!AUDIO) {
      AUDIO = new Audio()
      AUDIO.addEventListener('loadstart', () => {
        if (this.el) {
          this.el.classList.add('is-loading')
        }
      })
      AUDIO.addEventListener('playing', () => {
        if (this.el) {
          this.el.classList.remove('is-loading')
          this.el.classList.remove('is-pause')
          this.el.classList.add('is-play')
        }
      })
      AUDIO.addEventListener('pause', () => {
        if (this.el) {
          this.el.classList.remove('is-loading')
          this.el.classList.remove('is-play')
          this.el.classList.add('is-pause')
        }
      })
      AUDIO.addEventListener('ended', () => {
        if (this.el && !loop) {
          this.el.classList.remove('is-play')
        }
      })
    }

    if (AUDIO.src !== src) {
      AUDIO.src = src
      AUDIO.load()
    }
    AUDIO.loop = loop
    if (!AUDIO.paused) {
      AUDIO.pause()
    } else {
      AUDIO.play()
    }
  },
  stop () {
    if (this.el) {
      this.el.classList.remove('is-loading')
      this.el.classList.remove('is-play')
      this.el.classList.remove('is-pause')
      this.el = null
      AUDIO.src = ''
      AUDIO.pause()
    }
  }
}
