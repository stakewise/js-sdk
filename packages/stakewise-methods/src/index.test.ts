import crypto from 'crypto'
import faker from '@faker-js/faker'
import fetchMock from 'jest-fetch-mock'
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import { Web3Provider } from '@ethersproject/providers'
import { GetBalancesResult } from 'stakewise-methods'

import { mockData, mockJSON } from './util/fetchPoolStats.test'

import Methods from './index'
import { config, createContracts } from './util'


const address = getAddress(crypto.randomBytes(32).toString('hex').slice(0, 40))
const referral = getAddress(crypto.randomBytes(32).toString('hex').slice(0, 40))

const getMethods = (provider = {}) => (
  new Methods({
    address,
    referral,
    provider: provider as Web3Provider,
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
      const mockResult: GetBalancesResult = {
        nativeTokenBalance: BigNumber.from(faker.datatype.number()),
        stakedTokenBalance: BigNumber.from(faker.datatype.number()),
        rewardTokenBalance: BigNumber.from(faker.datatype.number()),
        swiseTokenBalance: BigNumber.from(faker.datatype.number()),
      }

      const mock = {
        provider: { getBalance: jest.fn(() => mockResult['nativeTokenBalance']) },
        stakedTokenContract: { balanceOf: jest.fn(() => mockResult['stakedTokenBalance']) },
        rewardTokenContract: { balanceOf: jest.fn(() => mockResult['rewardTokenBalance']) },
        swiseTokenContract: { balanceOf: jest.fn(() => mockResult['swiseTokenBalance']) },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods(mock.provider)

      const result = await methods.getBalances()

      expect(mock.provider.getBalance).toBeCalledWith(address)
      expect(mock.stakedTokenContract.balanceOf).toBeCalledWith(address)
      expect(mock.rewardTokenContract.balanceOf).toBeCalledWith(address)
      expect(mock.swiseTokenContract.balanceOf).toBeCalledWith(address)
      expect(result).toEqual(mockResult)
    })

    it('throws an error on getBalances method call', async () => {
      const mock = {
        provider: { getBalance: jest.fn(() => Promise.reject()) },
        stakedTokenContract: { balanceOf: jest.fn(() => Promise.reject()) },
        rewardTokenContract: { balanceOf: jest.fn(() => Promise.reject()) },
        swiseTokenContract: { balanceOf: jest.fn(() => Promise.reject()) },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods(mock.provider)

      await expect(() => methods.getBalances()).rejects.toThrowError(/Get balances failed/)
    })
  })

  describe('getStakingApr', () => {

    fetchMock.enableMocks()

    beforeEach(() => {
      fetchMock.resetMocks()
    })
    afterEach(() => {
      fetchMock.mockRestore()
    })

    it('creates instance of Methods with getStakingApr method', () => {
      const methods = getMethods()

      expect(typeof methods.getStakingApr).toEqual('function')
    })

    it('requests contracts and rest api on getStakingApr method call', async () => {
      const number = faker.datatype.number()
      const smallNumber = faker.datatype.number({ min: 1, max: 20 })
      const totalSupply = parseEther('32').mul(number)

      const mockData = {
        activation_duration: faker.datatype.number(),
        activated_validators: number,
        validators_apr: smallNumber,
      }

      mockJSON(mockData)

      const mock = {
        poolContract: { activatedValidators: jest.fn(() => BigNumber.from(number)) },
        stakedTokenContract: { totalSupply: jest.fn(() => totalSupply) },
        rewardTokenContract: { protocolFee: jest.fn(() => BigNumber.from(smallNumber)) },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      const result = await methods.getStakingApr()

      expect(mock.poolContract.activatedValidators).toBeCalledWith()
      expect(mock.stakedTokenContract.totalSupply).toBeCalledWith()
      expect(mock.rewardTokenContract.protocolFee).toBeCalledWith()
      expect(fetchMock.mock.calls).toEqual([ [ `${config[config.defaultNetwork].api.rest}/pool-stats/`] ])
      expect(result).toBeLessThanOrEqual(smallNumber)
    })
  })
})
