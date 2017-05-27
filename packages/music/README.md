# Music

## 引用
```javascript
import { music } from 'vmc'

Vue.use(music)
```

## 例子
提供基础的音乐预览，复杂的音频播放需使用其他组件。
为HTML元素添加 `v-music` 指令即可点击播放音乐，`v-music.loop` 循环播放。
`vm.$music.stop()` 可关闭正在播放的音频
`is-loading` `is-play` `is-paus` 3个样式控制播放状态

```html
<button v-music="src"></button>
```