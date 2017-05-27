# Storage

## 引用
```javascript
import { storage } from 'vmc'

Vue.use(storage)
```

## 例子
基于`localStorage`封装，使其新增`有效期`的特性以及可以直接存取`json`。当因为存储空间不足，导致写入失败，会尝试清理所有数据，再次写入。

```javascript
this.$storage.setItem(key, value, expired = 0) // 写入数据 expired 有效期 默认:0 永久有效
this.$storage.getItem(key) // 获取数据
this.$storage.removeItem(key) // 删除数据
this.$storage.clear() // 清理过期的数据
this.$storage.clearAll() // 清理所有数据
```