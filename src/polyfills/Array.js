/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */

if (!('find' in Array.prototype)) {
  Object.defineProperty(Array.prototype, 'find', {
    configurable: true,
    value: function find (callback) {
      if (this === undefined || this === null) {
        throw new TypeError(this + ' is not an object')
      }

      if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function')
      }

      const object = Object(this)
      const scope = arguments[1]
      const arraylike = object instanceof String ? object.split('') : object
      const length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0
      let index = -1
      let element

      while (++index < length) {
        if (index in arraylike) {
          element = arraylike[index]

          if (callback.call(scope, element, index, object)) {
            return element
          }
        }
      }
    },
    writable: true
  })
}

if (!('findIndex' in Array.prototype)) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    configurable: true,
    value: function findIndex (callback) {
      if (this === undefined || this === null) {
        throw new TypeError(this + ' is not an object')
      }

      if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function')
      }

      const object = Object(this)
      const scope = arguments[1]
      const arraylike = object instanceof String ? object.split('') : object
      const length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0
      let index = -1

      while (++index < length) {
        if (index in arraylike) {
          if (callback.call(scope, arraylike[index], index, object)) {
            return index
          }
        }
      }

      return -1
    },
    writable: true
  })
}
