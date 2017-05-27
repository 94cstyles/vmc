# async-data

## 引用
```javascript
import { asyncData } from 'vmc'

Vue.use(asyncData)
```

## 使用
`$loadingAsyncData` 和 `$on('async-data')` 监听异步加载数据完成

```javascript
export default {
    data () {
      return {
      }
    },
    asyncData (resolve, reject) {
      ...
    }
  }
```
