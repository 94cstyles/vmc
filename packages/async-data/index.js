export default function (Vue) {
  Vue.mixin({
    created () {
      if (this.$options.asyncData) {
        const resolve = (data) => {
          if (data) {
            for (const key in this.$data) {
              if (typeof data[key] !== 'undefined') this.$set(this.$data, key, data[key])
            }
          }
          this.$loadingAsyncData = false
          this.$emit('async-data')
        }

        const reject = (error) => console.error(error)

        this.$loadingAsyncData = true
        const res = this.$options.asyncData.call(this, resolve, reject)
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject)
        }
      }
    }
  })
}
