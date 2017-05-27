# HTTP

## 引用
```javascript
import { http } from 'vmc'

Vue.use(http, options?) 
```

## Options
[axios doc](https://github.com/mzabriskie/axios#request-config)

## 例子
基于 `axios` 封装，使 `post`, `put` , `patch` 默认就支持 `application/x-www-form-urlencoded`，不需要另外进行转换。另外新增 `abort` 方法，可终止当前正在发送的请求并不会触发 `catch`。

```javascript
this.$http.get // get请求
this.$http.post // post请求
...
this.$http.stringify // 转换JSON数据
this.$http.abort // 停止当前正在发送的请求
```