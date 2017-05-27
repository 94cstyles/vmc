# Drop Down

## 引用
```javascript
import { outerTouch, dropdown } from 'vmc'

Vue.use(outerTouch)
Vue.use(dropdown)
```

## 例子
将 `v-model` 绑定到一个本地变量，通过操作这个变量即可控制 `DropDown` 的显示与隐藏。
`options` 由对象注册的数组，每个对象有 `text` , `value` , `show` 3个键，`text` 为显示文本，`value` 为实际值，`show` 为选中后显示的文本。

```html
<template>
    <drop-down v-model="value" :options="options" label="请选择你所在的城市"></drop-down>
</template>
<script>
  export default {
    data () {
      return {
        value: '',
        options: [{
          'text': '重庆',
          'value': 'cq'
        }, {
          'text': '上海',
          'value': 'sh'
        }, {
          'text': '南京',
          'value': 'nj'
        }, {
          'text': '天津',
          'value': 'tj'
        }, {
          'text': '北京',
          'value': 'bj'
        }, {
          'text': '杭州',
          'value': 'hz'
        }, {
          'text': '深圳',
          'value': 'sz'
        }]
      }
    }
  }
</script>
```

## Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| className | 下拉器样式名 | String | | `'u-dropDown'`
| disabled | 是否禁用下拉 | Boolean |  | `false`
| label | 默认显示文本 | Boolean |  | `'请选择'`
| options | 下拉选项列表 | Array |  | 
