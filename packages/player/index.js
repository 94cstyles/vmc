import player from './src/index.vue'

export default function (Vue) {
  const Player = Vue.extend(player)
  let instance

  Vue.prototype.$player = function (data) {
    if (!instance) {
      instance = new Player({
        el: document.createElement('div')
      })

      document.body.appendChild(instance.$el)
      window.addEventListener('hashchange', () => {
        if (instance.visible && location.hash !== '#$player') {
          instance.exit()
        }
      })
    }

    data = Object.assign({
      loop: true,
      src: '',
      poster: ''
    }, Object.prototype.toString.call(data) === '[object String]' ? {src: data} : data)

    for (const key in data) {
      if (typeof instance[key] !== 'undefined') instance[key] = data[key]
    }

    // 可以使用系统返回来关闭播放器
    history.pushState(null, document.title, location.href.split('#')[0] + '#$player')

    Vue.nextTick(() => {
      const video = instance.$refs.video
      instance.visible = true
      instance.duration = Number(video.duration) || 0
      instance.loaded = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0
      instance.played = 0
      instance.loading = false
      instance.$refs.video.play()
    })

    return instance
  }
}
