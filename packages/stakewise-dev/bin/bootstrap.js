require('@babel/register')({
  ignore: [
    // path.resolve('dist'),
    /node_modules/,
  ],
  extensions: [ '.js', '.ts', '.tsx' ],
})
