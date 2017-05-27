# Popup

## Tip
> 待完善: 浮层滚动阻止window窗体滚动

## 引用
```javascript
import { popup } from 'vmc'

Vue.use(popup)
```

## 例子
将 `v-model` 绑定到一个本地变量，通过操作这个变量即可控制 `popup` 的显示与隐藏。
`position` 属性指定了 `popup` 的位置。比如，`position` 为 `bottom` 时，`popup` 会从屏幕下方移入，并最终固定在屏幕下方。移入/移出的动效会根据 `position` 的不同而自动改变，无需手动配置。
使用 `vm.$popup.close()` 关闭所有弹出层

```html
<popup v-model="visible" position="bottom">
  ...
</popup>
```

## Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| position | popup的位置 | String | `top` `right` `middle` `bottom` `left'` | `middle`
| popupClass | popup的样式 | String |  |
| opacity | 遮罩层透明度，-1时隐藏遮罩层 | Number | `-1 ~ 100` | `50`
| closeOnClickMask | 是否可以通过点击遮罩层来关闭popup | Boolean | | `true`
| destroy | 关闭后是否摧毁dom | Boolean | | `false`

## Slot
| name | 描述 |
| :- | :- |
| - | 弹出框内容 |