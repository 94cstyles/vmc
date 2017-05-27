# Uploader

## 引用
```javascript
import { http, popup, toast, indicator, uploader } from 'vmc'

Vue.use(http)
Vue.use(popup)
Vue.use(toast)
Vue.use(indicator)
Vue.use(uploader, options?)
```

## OPTIONS
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| host | 上传接口地址 | String |  |
| token | 获取七牛上传token接口 | String |  |
| domain | 文件上传后访问地址 | String |  |
| expired | 上传token缓存事件 单位:ms | Number |  | 1800000

## 例子
默认上传到 `七牛`，分片上传，断点续传。当 `host` 被修改为非七牛上传地址后会通过 `fromData` 上传（不分片）。
`v-model` 绑定文件访问地址。
`class` 设置上传按钮样式
`accept`对上传文件进行限制，可选类型`'image', 'video', 'audio', {extensions:'', mimeTypes: ''}`
`options`对图片文件进行裁剪:
```javascript
{ 
  cropWidth: '裁剪大小',
  cropHeight: '裁剪大小',
  zoomRatio: '缩放比',
  quality: '裁剪后图片质量 [1 - 100]',
  gap: '缩放触发值',
  borderSize: '裁剪区域border大小',
  borderColor: '裁剪区域border颜色',
  background: '遮罩层颜色'
}
```
`beforeUpload`文件上传前处理函数，参数`(file, next)`，调用`next()`继续上传。
`uploaded`文件上传完成处理函数，传递**文件访问地址**。

```html
<template>
    <uploader v-model="fileSrc">
      <button>上传所有文件</button>
    </uploader>
    <div v-show="fileSrc">{{fileSrc}}</div>
    <uploader :uploaded="uploaded" :accept="accept" :options="options">
      <button>上传200*100的图片</button>
    </uploader>
    <img v-if="imageSrc" :src="imageSrc">
</template>
<script>
  export default {
    data () {
      return {
        accept: {extensions: 'jpg,png', mimeTypes: 'images/*'},
        options: {
          cropWidth: 200,
          cropHeight: 100
        },
        fileSrc: '',
        imageSrc: ''
      }
    },
    methods: {
      uploaded (src) {
        this.imageSrc = src
      }
    }
  }
</script>
```

## Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :- | :- | - | :- | - |
| accept | 文件类型限制 | String,Object |  |
| options | 图片裁剪设置 | Object |  | null
| beforeUpload | 文件上传前处理函数 | Function |  |
| uploaded | 文件上传完成处理函数 | Function |  |

## Slot
| name | 描述 |
| :- | :- |
| - | 上传按钮内容 |