# vue mobile components
> 默认注入了 `Promise`，`Promise.series`，`Object.assign`，`Array.prototype.find`，`Array.prototype.findIndex` 等 polyfill

## 安装
```shell
npm i -S git+https://github.com/94cstyles/vmc.git
```

## 使用
```javascript
import Vue from 'vue'
import vmc from 'vmc'
import 'vmc/lib/style.css'

Vue.use(vmc, options?)
```

或者直接引用源文件
```javascript
import vmc from 'vmc/src/index' // 需要 sass-loader

Vue.use(vmc, options?)
```

或者使用 [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)

```javascript
import vmc from 'vmc'

Vue.use(vmc, options?)

// or 按需导入
import 'vmc/lib/polyfills' // 可以导入制定的polyfill 或者使用 `babel-polyfill`
import { popup, toast } from 'vmc'

Vue.use(popup)
Vue.use(toast)
```
## 组件
- [actionsheet](./packages/actionsheet/README.md)
- [alert](./packages/alert/README.md)
- [async-data](./packages/async-data/README.md)
- [dropdown](./packages/dropdown/README.md)
- [emitter](./packages/emitter/README.md)
- [http](./packages/http/README.md)
- [indicator](./packages/indicator/README.md)
- [infinite-scroll](./packages/infinite-scroll/README.md)
- [lazyload](./packages/lazyload/README.md)
- [music](./packages/music/README.md)
- [outer-touch](./packages/outer-touch/README.md)
- [player](./packages/player/README.md)
- [popup](./packages/popup/README.md)
- [storage](./packages/storage/README.md)
- [toast](./packages/toast/README.md)
- [uploader](./packages/uploader/README.md)
- [virtual-scroll](./packages/virtual-scroll/README.md)