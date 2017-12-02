require('babel-register')

const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const data = require('./lib/data')

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css/,
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
  ],
  node: {
    fs: 'empty'
  }
}
