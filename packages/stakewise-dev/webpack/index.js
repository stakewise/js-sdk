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
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'StakeWise Widget Test',
    }),
  ],
}


export default config
