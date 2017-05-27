# Alert

## 引用
```javascript
import { popup, alert } from 'vmc'

Vue.use(popup)
Vue.use(alert)
```

## 例子
`Alert` 组件只提供最基础的支持，如需复杂的弹窗请用 `Popup` 来实现。
`buttons` 由对象组成的数组，每个对象有 `label` 和 `method` 两个键，`label` 为按钮文本，`method` 为点击按钮的回调函数。

```javascript
this.$alert('操作成功!')
this.$alert('系统提示', '操作成功!')
this.$confirm('确定执行此操作?').then(()=> console.log('点击了确定')).catch(()=> console.log('点击了取消'))
this.$prompt('请输入你的姓名').then((value)=> console.log('你的名字是:' + value))
this.$alert({...})
```

## API
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| title | 标题 | String |  | `↑`
| message | 文本内容 | String |  |
| showInput | 是否显示输入框 | Boolean |  | `false`
| inputType | 输入框类型 | String |  | `text`
| inputValue | 输入框默认值 | String |  |
| inputPlaceholder | 输入提示 | String |  |
| buttons | 按钮组 | Array |  |
| opacity | 遮罩层透明度 |  Number | `-1 ~ 100` | `↑`
| closeOnClickMask | 是否可以点击遮罩层关闭 |  Boolean | | `↑`
