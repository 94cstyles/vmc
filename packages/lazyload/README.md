# Lazy Load

## 引用
```javascript
import { lazyload } from 'vmc'

Vue.use(lazyload, options?)
```

## OPTIONS 
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| preload | 预加载可视区域比例 | Number |  | `1.3`
| filter | 图片处理 | Function |  |

## 例子
为`img`元素添加`v-lazy`指令，指令的值为图片的地址。
```html
<ul>
  <li v-for="item in list">
    <img v-lazy="item">
  </li>
</ul>
```

为`div`元素添加`v-lazy:background-image`指令，使其懒加载背景图。
```html
<ul>
  <li v-for="item in list">
    <div v-lazy:background-image="item"></div>
  </li>
</ul>
```

为`img`元素添加`v-lazy.active`指令，使其立即加载图片
```html
<img v-lazy.active="'图片地址'">
```

检测客户端是否支持`webp`，为其使用`webp`格式的文件
```javascript
Vue.use(LazyLoad, {
  filter: (photo, webp) => photo.src + (webp ? '.webp' : '')
})
```

设置`img`各个状态的效果
```css
img[lazy='lading'] { ... }
img[lazy='error'] { ... }
img[lazy='loaded'] { ... }
```

为`img`增加预加载高度，`data-width`原图宽度，`data-height`原图高度。
```html
<img v-lazy="'图片地址'" data-width="300" data-height="200">
```