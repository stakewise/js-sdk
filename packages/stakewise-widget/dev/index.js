const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

const compiler = webpack(config)


express()
  .use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  )
  .listen(4001)


console.log('Server started at http://localhost:4001/')
