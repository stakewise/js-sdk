const config = {
  presets: [
    [
      '@babel/preset-env',
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource: 'preact',
      },
    ],
    '@babel/preset-typescript',
  ],
  ignore: [ 'node_modules', '**/types', '**/types.d.ts' ],
}


module.exports = config
