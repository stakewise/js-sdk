const { projects, ...base } = require('../../jest.config.base.js')

module.exports = {
  ...base,
  moduleNameMapper: {
    '\\.(css|less)$': '../style.mock.js',
  }
}
