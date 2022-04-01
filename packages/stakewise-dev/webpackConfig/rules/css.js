import MiniCssExtractPlugin from 'mini-css-extract-plugin'


export default [
  {
    test: /\.css$/,
    use: [
      'style-loader',//MiniCssExtractPlugin.loader,
      'css-loader',
    ],
  },
]
