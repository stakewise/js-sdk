const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      title: 'StakeWise Widget Test',
      inject: false,
      templateContent: ({ htmlWebpackPlugin }) => `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>StakeWise Widget Test</title>
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <script defer="defer" src="${htmlWebpackPlugin.files.js[0]}"></script>
            <!--link href="/styles.css" rel="stylesheet"-->
          </head>
          <body></body>
        </html>
      `,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
}