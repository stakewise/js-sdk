import crypto from 'crypto'
import faker from '@faker-js/faker'
import { Web3Provider } from '@ethersproject/providers'

import Methods from './index'


jest.mock('./util/createContracts')

const string = faker.random.word()
const address = `0x${crypto.randomBytes(32).toString('hex').slice(0, 40)}`

const getMethods = () => (
  new Methods({
    address,
    referral: string,
    provider: {} as Web3Provider,
  })
)

describe('index.ts', () => {

  describe('getBalances', () => {

    it('creates instance of Methods with getBalances method', () => {
      const methods = getMethods()

      expect(typeof methods.getBalances).toEqual('function')
    })
  })
})
