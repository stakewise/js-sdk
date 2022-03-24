import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import rules from './rules'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const config = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: {
    client: path.join(__dirname, '../src/index.tsx'),
  },
  // entry: {
  //   client: [ 'webpack-hot-middleware/client', path.resolve('src/index.tsx') ],
  // },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    // libraryTarget: 'var',
    // library: 'widget',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      // 'react-dom/test-utils': 'preact/test-utils',
    },
    modules: [
      'node_modules',
      path.resolve('src'),
    ],
    extensions: [ '.js', '.ts', '.tsx', '.scss' ],
  },
  resolveLoader: {
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules,
  },
  plugins: [
    // HMR
    // new webpack.HotModuleReplacementPlugin(),
    // new PreactRefreshPlugin(),
    // Styles
    new MiniCssExtractPlugin({
      // filename: 'styles.css',
    }),
    // HTML
    new HtmlWebpackPlugin({
      title: 'StakeWise Widget Test',
      // inject: false,
      // templateContent: ({ htmlWebpackPlugin }) => `
      //   <!doctype html>
      //   <html>
      //     <head>
      //       <meta charset="utf-8">
      //       <title>StakeWise Widget Test</title>
      //       <meta name="viewport" content="width=device-width,initial-scale=1">
      //       <script defer="defer" src="${htmlWebpackPlugin.files.js[0]}"></script>
      //       <script>
      //         console.log(${JSON.stringify(htmlWebpackPlugin)})
      //       </script>
      //       <!--link href="/styles.css" rel="stylesheet"-->
      //     </head>
      //     <body></body>
      //   </html>
      // `,
    }),
  ],
}


export default config
