import webpack from 'webpack'

import webpackConfig from '../webpackConfig'


const compiler = webpack(webpackConfig)

compiler.run((error, stats) => {
  if (!error && !stats.hasErrors()) {
    console.log(`Compiled files: ${webpackConfig.output.path}`)
  }
  else {
    console.error(stats.compilation.errors)
  }
})
