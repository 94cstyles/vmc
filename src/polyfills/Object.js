/* eslint no-extend-native: ["error", { "exceptions": ["Object"] }] */

if (!Object.assign) {
  Object.assign = function (target, source) {
    for (let index = 1; index < arguments.length; ++index) {
      const src = arguments[index]

      for (const key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          target[key] = src[key]
        }
      }
    }
    return target
  }
}
