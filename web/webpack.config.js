const webpack = require('web-scripts/node_modules/webpack')
const HtmlWebpackPlugin = require('web-scripts/node_modules/html-webpack-plugin')
const { babelLoader, resolveFrom, buildOut } = require('web-scripts/src/buildUtil')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  entry: {
    app: resolveFrom('./src/app.tsx'),
  },
  output: {
    path: buildOut,
    pathinfo: false,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      common: resolveFrom('node_modules/web-common/src'),
    },
  },
  stats: {
    entrypoints: false,
    assets: false,
    modules: false,
    children: false,
  },
  devtool: false,
  performance: false,
  cache: false,
  module: {
    rules: [
      babelLoader({
        exclude: {
          and: [/node_modules/],
          not: [/web-common/],
        },
      }),
    ],
  },
  plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin()],
}
