import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'


export default [
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]',
            exportOnlyLocals: false,
          },
          importLoaders: 2,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          additionalData: '@import "scss/index";',
          sassOptions: {
            includePaths: [
              path.resolve('src'),
            ],
          },
          sourceMap: true,
        },
      }
    ],
  },
]
