import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { execSync } from 'child_process'

import config from '../webpack'

const compiler = webpack(config)

// const compile = () => {
//   execSync(`npm run build --prefix=../stakewise-methods`)
//   execSync(`npm run build --prefix=../stakewise-widget`)
// }

// compile()

express()
  .use((req, res, next) => {
    // if (req.path === '/') {
    //   compile()
    // }

    next()
  })
  .use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  )
  .listen(4001)


console.log('Server started at http://localhost:4001/')
