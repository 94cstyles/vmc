# Virtual Scroll

## 引用
```javascript
import { virtualScroll } from 'vmc'

Vue.use(virtualScroll)
```

## 例子
虚拟滚动，优化大量数据出现的性能瓶颈。**支持弹性布局**。通过监听`onBottom`事件可以实现滚动加载。

```html
<template>
  <layout>
    <virtual-scroll size="5.333rem" offset=".4rem" :remain="5" @toBottom="onBottom">
      <div v-for="(udf, index) of items" :key="index" :style="{ 'height': '5.333rem' }">{{ index + 1 }}</div>
    </virtual-scroll>
  </layout>
</template>
<script>
  export default {
    data () {
      return {
        items: new Array(200)
      }
    },
    methods: {
      onBottom () {
        this.items = this.items.concat(new Array(200))
      }
    }
  }
</script>
```

## Props
`size` 和 `offset` 支持单位 **rem** , **vw** , **vh** , **px**
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| size | slot大小， | String,Number | |
| offset | slot间隔 | String,Number |  | 0
| preload | 向上预加载slot个数 | Number |  | 0
| remain | 保留的slot个数 | Number |  | 10
| disabled | 是否禁止触发`onBottom`事件 | Boolean |  | false

## Slot
| name | 描述 |
| :- | :- |
| - | 子元素，子元素必须高度一致 |