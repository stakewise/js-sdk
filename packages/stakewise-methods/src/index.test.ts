import crypto from 'crypto'
import faker from '@faker-js/faker'
import { Web3Provider } from '@ethersproject/providers'

import Methods from './index'


const string = faker.random.word()
const address = `0x${crypto.randomBytes(32).toString('hex').slice(0, 40)}`

describe('index.ts', () => {

  it('creates instance of Methods with getBalances method', () => {
    // const methods = new Methods({
    //   address,
    //   referral: string,
    //   provider: new Web3Provider('WalletLink'),
    // })
  })
})
