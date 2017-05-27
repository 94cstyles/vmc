process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfig = require('./webpack.base.conf')

module.exports = function (entry) {
  const name = entry.replace(/\.\/(src|packages)\/?/, '')
  return Object.assign(webpackConfig, {
    entry: {
      index: entry + '/index.js'
    },
    output: {
      path: path.join(process.cwd(), `lib/${name}`),
      filename: '[name].js',
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },
    devtool: false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${process.env.NODE_ENV}"`
        }
      }),
      new ExtractTextPlugin({
        filename: 'style.css'
      })
    ]
  })
}
