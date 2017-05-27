/**
 * 扩展localStorage
 * 增加有效期控制
 * 增加数据序列化
 */
export default {
  /**
   * 存入数据
   * 当因为存储空间不足 导致写入失败 会尝试清理所有数据 再次写入
   * @param key {String}
   * @param value {Object|String|Array|Boolean|Number}
   * @param expired {Number} 有效期 单位毫秒
   */
  setItem (key, value, expired = 0) {
    const data = {
      value: value,
      create: Date.now(),
      expired: expired
    }
    try {
      // 无痕模式下会报错
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      if (e === 'QUOTA_EXCEEDED_ERR') {
        // 容量满了 无法写入新数据
        localStorage.clear() // 清理所有数据
        try {
          localStorage.setItem(key, JSON.stringify(data)) // 重新写入数据
        } catch (e) {
          // 存入数据本身就大于限制 无法写入
          console.error(e)
        }
      }
    }
  },
  /**
   * 获取数据
   * @param key {String}
   * @returns {Object|String|Array|Boolean|Number}
   */
  getItem (key) {
    let data = localStorage.getItem(key)

    if (data) {
      try {
        data = JSON.parse(data) // 数据错误
      } catch (e) {
        data = null
      }

      // 是经过封装的
      if (Object.prototype.toString.call(data) === '[object Object]') {
        // 有效期过了
        if (data.expired > 0 && (Date.now() > (data.expired + data.create))) {
          this.removeItem(key)
          return null
        }
        return data.value
      }
    }
    return data
  },
  /**
   * 删除数据
   * @param key {String}
   */
  removeItem: (key) => localStorage.removeItem(key),
  /**
   * 清理过期数据
   */
  clear: () => {
    for (const key in localStorage) {
      this.getItem(key)
    }
  },
  /**
   * 清理所有数据
   */
  clearAll: () => localStorage.clear()
}
