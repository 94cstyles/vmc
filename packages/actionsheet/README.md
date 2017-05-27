# Action sheet

## 引用
```javascript
import { popup, actionsheet } from 'vmc'

Vue.use(popup)
Vue.use(actionsheet)
```

## 例子
`sheet` 由对象组成的数组，每个对象有 `label` , `method` , `className` 三个键，`label` 为菜单项的文本或html，`method` 为点击该菜单项的回调函数，`className` 为菜单项自定义样式。

```javascript
const sheet = [{
  'label': '拍照',
  'method': () => console.log('你点了拍照按钮')
}, {
  'label': '从相册中选择',
  'method': () => console.log('你点了相册按钮')
}]

this.$actionsheet(sheet)
this.$actionsheet(sheet, '') // 无取消按钮
```

## API
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| sheet | 菜单项数组 | Array | |
| cancelText | 取消按钮的文本。若设为空字符串，则无取消按钮且无法通过点遮罩层关闭。 | String |  | `取消`