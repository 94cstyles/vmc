# Indicator

## 引用
```javascript
import { popup, indicator } from 'vmc'

Vue.use(popup)
Vue.use(indicator)
```

## 例子
当需要显示加载提示框时，调用 `open` 方法
```javascript
this.$indicator.open()
```
在加载图标下方显示文本
```javascript
this.$indicator.open('加载中...')
```
调用 `close` 方法将其关闭
```javascript
this.$indicator.close()
```

## API
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| text | 文本内容 | String |  | 