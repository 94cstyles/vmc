const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfig = require('./webpack.base.conf')

module.exports = Object.assign(webpackConfig, {
  entry: [
    './build/dev-client',
    './example/main.js'
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
