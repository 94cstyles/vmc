const pth = require('path')
const fs = require('fs')
const del = require('del')
const ora = require('ora')
const webpack = require('webpack')
const config = require('./webpack.build.conf')
const spinner = ora(`building packages...`)

spinner.start()

const build = function (path) {
  return new Promise(function (resolve, reject) {
    webpack(config(path), (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}
const promises = [build(`./src`)]
const packages = fs.readdirSync(pth.join(process.cwd(), 'packages'))
let README = fs.readFileSync(pth.join(process.cwd(), 'README.md'), 'utf8').split('## 组件')[0]
README += '## 组件'
for (const name of packages) {
  if (!/^\./.test(name)) {
    README += `\n- [${name}](./packages/${name}/README.md)`
    promises.push(build(`./packages/${name}`))
  }
}
fs.writeFileSync(pth.join(process.cwd(), 'README.md'), README) // 修改文档

// 开始执行
del.sync(pth.join(process.cwd(), 'lib'))
Promise.all(promises).then(function () {
  spinner.stop()

  const libs = fs.readdirSync(pth.join(process.cwd(), 'lib'))
  // 检测是否包含css文件，没有则创建空的css文件
  for (const name of libs) {
    if (!/^\./.test(name) && !/\.(js|css)$/.test(name)) {
      const path = pth.join(process.cwd(), 'lib', name, 'style.css')
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '')
      }
    }
  }
})
