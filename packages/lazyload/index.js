import Lazy from './lazy'

export default function (Vue, options) {
  const lazy = new Lazy(Object.assign({
    preload: 1.3,
    nextTick: Vue.nextTick,
    filter: (photo) => photo.src
  }, options))

  Vue.directive('lazy', {
    inserted: lazy.add.bind(lazy, 'inserted'),
    update: lazy.add.bind(lazy, 'update'),
    unbind: lazy.remove.bind(lazy)
  })
}
