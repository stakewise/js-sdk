module.exports = {
  preset: 'ts-jest',
  bail: true,
  verbose: true,
  roots: ['<rootDir>/lib'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testRegex: '/*.spec.(js|ts)$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  cacheDirectory: '.jest/cache'
}
