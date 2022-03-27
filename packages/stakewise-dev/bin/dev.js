import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import config from '../webpack'


const compiler = webpack(config)

// execSync(`npm run build --prefix=../stakewise-methods`)
// execSync(`npm run build --prefix=../stakewise-widget`)

express()
  .use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }))
  .listen(4001)

console.log('Server started at http://localhost:4001/')
