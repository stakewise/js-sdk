const path = require('path')

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    client: path.join(__dirname, './client.js'),
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'widget',
  },
  module: {
    loaders: [
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
}