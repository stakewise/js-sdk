import crypto from 'crypto'
import faker from '@faker-js/faker'
import { Web3Provider } from '@ethersproject/providers'

import Methods from './index'

import createContracts from './util/createContracts'


const string = faker.random.word()
const address = `0x${crypto.randomBytes(32).toString('hex').slice(0, 40)}`

const getMethods = () => (
  new Methods({
    address,
    referral: string,
    provider: {} as Web3Provider,
  })
)

jest.mock('./util/createContracts', () => jest.fn())

describe('index.ts', () => {

  describe('getBalances', () => {

    it('creates instance of Methods with getBalances method', () => {
      const methods = getMethods()

      expect(typeof methods.getBalances).toEqual('function')
    })

    it('requests contracts on getBalances method call', async () => {
      const mockResult = {
        nativeTokenBalance: faker.datatype.number(),
        stakedTokenBalance: faker.datatype.number(),
        rewardTokenBalance: faker.datatype.number(),
        swiseTokenBalance: faker.datatype.number(),
      }

      const mock = {
        multicallContract: { getEthBalance: jest.fn(() => mockResult['nativeTokenBalance']) },
        stakedTokenContract: { balanceOf: jest.fn(() => mockResult['stakedTokenBalance']) },
        rewardTokenContract: { balanceOf: jest.fn(() => mockResult['rewardTokenBalance']) },
        swiseTokenContract: { balanceOf: jest.fn(() => mockResult['swiseTokenBalance']) },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      const result = await methods.getBalances()

      expect(mock.multicallContract.getEthBalance).toBeCalledWith(address)
      expect(mock.stakedTokenContract.balanceOf).toBeCalledWith(address)
      expect(mock.rewardTokenContract.balanceOf).toBeCalledWith(address)
      expect(mock.swiseTokenContract.balanceOf).toBeCalledWith(address)
      expect(result).toEqual(mockResult)
    })
  })
})
