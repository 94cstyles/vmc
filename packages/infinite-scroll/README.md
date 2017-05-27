# Infinite Scroll

## 引用
```javascript
import { infiniteScroll } from 'vmc'

Vue.use(infiniteScroll)
```

## 例子
为HTML元素添加 `v-infinite-scroll` 指令即可使用无限滚动。滚动该元素，当其底部与被滚动元素底部的距离小于给定的阈值（ `infinite-scroll-distance` ）时，绑定到 `v-infinite-scroll` 指令的方法就会被触发。
```html
<template>
  <layout>
    <ul v-infinite-scroll="loadData">
      <li v-for="(udf, index) in listData">{{ index + 1 }}</li>
    </ul>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        listData: []
      }
    },
    methods: {
      loadData () {
        this.listData = this.listData.concat(new Array(20))
      }
    }
  }
</script>
```

## API 
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| infinite-scroll-disabled | 若为真，则无限滚动不会被触发 | Boolean |  | `false`
| infinite-scroll-distance | 触发加载方法的滚动距离阈值（像素） | Number |  | `0`
| infinite-scroll-immediate-check | 若为真，则指令被绑定到元素上后会立即检查是否需要执行加载方法。在初始状态下内容有可能撑不满容器时十分有用。 | Boolean |  | `true`
| infinite-scroll-listen-for-event | event name，通过`this.$emit(event)`触发加载。 | String |  |