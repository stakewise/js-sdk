require('dotenv').config()
require('@babel/register')({
  ignore: [
    /node_modules/,
  ],
  extensions: [ '.js', '.ts', '.tsx' ],
})
