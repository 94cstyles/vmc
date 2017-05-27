# Toast

## 引用
```javascript
import { popup, toast } from 'vmc'

Vue.use(popup)
Vue.use(toast, options?)
```

## OPTIONS
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| position | 默认位置 | String | `top` `middle` `bottom` | `middle`
| duration | 默认关闭时间 单位:ms | Number | | `2400`

## 例子

```javascript
this.$toast('消息提示')
this.$toast('提交成功', true)
this.$toast('提交失败', false)
this.$toast({'message': '在底部的提示', 'position': 'bottom'})
```

## API
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| message | 文本内容 | String |  | 
| position | toast的位置 | String | `top` `middle` `bottom` | `↑`
| icon | 图标 | Boolean | `success` `failure` |  