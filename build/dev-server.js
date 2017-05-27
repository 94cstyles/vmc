const os = require('os')
const opn = require('opn')
const express = require('express')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')

// 获取本地局域网ip
function ip () {
  const iptable = {}
  const ifaces = os.networkInterfaces()
  for (const dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
      if (details.family === 'IPv4') {
        iptable[dev + (alias ? ':' + alias : '')] = details.address
      }
    })
  }

  for (const key in iptable) {
    if (iptable[key] !== '127.0.0.1') {
      return iptable[key]
    }
  }
  return '127.0.0.1'
}

const app = express()
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: true
}))
app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}))
app.use('/uptoken', proxy({target: 'http://jssdk.demo.qiniu.io', changeOrigin: true}))

app.listen(3000, () => opn(`http://${ip()}:${3000}`))
