# Outer Touch

## 引用
```javascript
import { outerTouch } from 'vmc'

Vue.use(outerTouch)
```

## 例子
```html
<div v-outerTouch="onOuterTouch" :outer-touch-disabled="disabled"></div>
```

## Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| outerTouchDisabled | 是否禁用outerTouch事件 | Boolean |  | `false`