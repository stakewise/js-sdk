import webpack from 'webpack'

import config from '../webpack'


const compiler = webpack(config)

compiler.run((error, stats) => {
  if (!error && !stats.hasErrors()) {
    console.log(`Compiled files: ${config.output.path}`)
  }
  else {
    console.error(stats.compilation.errors)
  }
})
