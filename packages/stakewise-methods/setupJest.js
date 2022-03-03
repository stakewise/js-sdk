const { waffleJest } = require('@ethereum-waffle/jest')


jest.setTimeout(60000)
expect.extend(waffleJest)
