import es6Promise from 'es6-promise/dist/es6-promise.auto.min'

es6Promise.polyfill()

/**
 * Promise串行执行
 * @param promises {Array<Promise>}
 * @returns {Promise}
 */
window.Promise.series = function (promises) {
  promises = promises.slice()
  let results = null

  return new Promise((resolve, reject) => {
    function next (result) {
      results = !results ? [] : results.concat(result)

      if (promises.length) {
        let promise = promises.shift()

        if (typeof promise === 'function') {
          promise = promise()
        }

        if (!promise || typeof promise.then !== 'function') {
          promise = Promise.resolve()
        }

        promise.then(next).catch(reject)
      } else {
        resolve(results)
      }
    }

    next()
  })
}
