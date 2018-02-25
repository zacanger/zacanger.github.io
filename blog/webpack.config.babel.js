import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import data from './lib/data'

export default {
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
