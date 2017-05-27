import axios from 'axios/lib/axios'
import guid from '../../src/utils/guid'

export default function (Vue, options = {}) {
  function encode (str) {
    const replacer = {
      '!': '%21',
      '\'': '%27',
      '(': '%28',
      ')': '%29'
    }
    return encodeURIComponent(str).replace(/[!'()]/g, (match) => replacer[match])
  }

  function stringify (obj, prefix) {
    if (obj === null) obj = 'null'

    let queue = []

    if (obj instanceof Date) {
      queue.push(`${encode(prefix)}=${encode(Date.prototype.toISOString.call(obj))}`)
    } else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      queue.push(`${encode(prefix)}=${encode(obj)}`)
    } else if (/\[object (Object|Array)\]/.test(Object.prototype.toString.call(obj))) {
      const keys = Object.keys(obj)
      let key, i
      for (i = 0; i < keys.length; i++) {
        key = keys[i]
        queue = queue.concat(stringify(obj[key], prefix ? `${prefix}[${key}]` : key))
      }
    }

    return queue
  }

  const REQUEST_CACHE = {}
  const request = axios.Axios.prototype.request

  /**
   * 重构Axios.prototype.request 使每个请求都添加cancelToken
   * @param config
   * @returns {Promise}
   */
  axios.Axios.prototype.request = function (config) {
    if (typeof config === 'string') {
      config = Object.assign({
        url: arguments[0]
      }, arguments[1])
    }

    let id
    if (!config.cancelToken) {
      config.cancelToken = new axios.CancelToken((cancel) => {
        REQUEST_CACHE[id = guid()] = cancel
      })
    }

    return new Promise((resolve, reject) => {
      request.call(http, config)
        .then((response) => {
          if (id) delete REQUEST_CACHE[id]
          resolve(response)
        })
        .catch((error) => {
          if (id) delete REQUEST_CACHE[id]
          if (!(error instanceof axios.Cancel)) reject(error) // 忽略请求取消错误
        })
    })
  }

  const http = axios.create(Object.assign({
    transformRequest: [function (data) {
      return Object.prototype.toString.call(data) === '[object Object]' ? stringify(data).join('&') : data
    }]
  }, options))

  /**
   * 转换数据格式 使请求支持application/x-www-form-urlencoded
   * @param data {Object}
   * @returns {string}
   */
  http.stringify = (data) => stringify(data).join('&')

  /**
   * 中断当前所有请求
   */
  http.abort = function () {
    for (const id in REQUEST_CACHE) {
      if (REQUEST_CACHE[id]) REQUEST_CACHE[id]()
    }
  }

  Vue.prototype.$http = http
}
