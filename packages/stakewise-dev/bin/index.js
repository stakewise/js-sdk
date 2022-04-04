require('./bootstrap')

const isDEV = process.argv.includes('DEV')

if (isDEV) {
  require('./dev')
}
else {
  require('./build')
}
