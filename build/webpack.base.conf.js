const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(process.cwd(), dir)
}

function cssLoaders () {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: true,
      sourceMap: false
    }
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: false
        })
      })
    }

    if (/^production$/.test(process.env.NODE_ENV)) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    scss: generateLoaders('sass')
  }
}

module.exports = {
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': resolve('public/src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: cssLoaders()
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('packages'), resolve('example')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('[path][name].[hash:7].[ext]')
        }
      }
    ]
  },
  devtool: '#cheap-module-eval-source-map'
}
