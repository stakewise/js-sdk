const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    client: path.join(__dirname, './client.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'widget',
    publicPath: '/',
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'StakeWise Widget Test',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
}