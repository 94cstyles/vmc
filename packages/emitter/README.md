# emitter

## 引用
```javascript
import { emitter } from 'vmc'

Vue.use(emitter)
```

## 使用
`$dispatch(componentName, eventName, ...params)` 向父组件调度事件

`$broadcast(componentName, eventName, ...params)` 向子组件广播事件

通过 `vm` 的 `name` 属性查找组件
