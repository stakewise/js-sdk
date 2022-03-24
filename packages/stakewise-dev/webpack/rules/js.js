export default [
  {
    test: /\.(js|ts)x?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        // presets: ['react'],
        cacheDirectory: true,
      },
    },
  },
]
