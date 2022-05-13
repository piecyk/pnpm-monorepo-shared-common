const webpack = require('web-scripts/node_modules/webpack')
const ForkTsCheckerWebpackPlugin = require('web-scripts/node_modules/fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('web-scripts/node_modules/html-webpack-plugin')
const { babelLoader, resolveFrom, buildOut, useTsc } = require('web-scripts/src/buildUtil')

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
  devServer: {
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
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
  plugins: [
    new webpack.ProgressPlugin(),
    useTsc &&
      new ForkTsCheckerWebpackPlugin({
        logger: 'webpack-infrastructure',
      }),
    new HtmlWebpackPlugin(),
  ].filter(Boolean),
}
