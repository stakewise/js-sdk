import express from 'express'
import webpack from 'webpack'
import watch from 'watch'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { execSync } from 'child_process'

import webpackConfig from '../webpackConfig'


const onChange = (file) => {
  const isWidgetFile = /stakewise-widget\/src\/.*\.ts$/.test(file)
  const isMethodsFile = /stakewise-methods\/src\/.*\.ts$/.test(file) && !/\/types\//.test(file)

  if (isWidgetFile) {
    execSync(`npm run build --prefix=../stakewise-widget`)
  }
  if (isMethodsFile) {
    execSync(`npm run build --prefix=../stakewise-methods`)
  }
}

watch.createMonitor('../', (monitor) => {
  monitor.on('created', onChange)
  monitor.on('changed', onChange)
  monitor.on('removed', onChange)
})

console.log('File watcher enabled')


const compiler = webpack(webpackConfig)

express()
  .use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }))
  .listen(4001)

console.log('Server started at http://localhost:4001/')
