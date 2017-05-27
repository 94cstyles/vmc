# Player

## 引用
```javascript
import { player } from 'vmc'

Vue.use(player)
```

## 例子
提供基础的视频预览，复杂的视频播放需使用其他组件。
`vm.$player(options || src)` 调用视频预览

```html
<template>
  <button @click="$player(videoInfo)">播放视频 1</button>
  <button @click="$player('http://devtest.qiniudn.com/若能绽放光芒.mp4')">播放视频 2</button>
</template>
<script>
  export default {
    data () {
      return {
        videoInfo: {
          src: 'http://devtest.qiniudn.com/若能绽放光芒.mp4', // 视频地址 未做视频处理 只能传当前递客户端支持的视频格式
          poster: 'http://devtest.qiniudn.com/若能绽放光芒.png', // 封面图
          loop: false // 是否循环播放 默认true 如为false 播放完毕后会自动关闭预览窗
        }
      }
    }
  }
</script>
```