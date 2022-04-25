import faker from '@faker-js/faker'
import fetchMock from 'jest-fetch-mock'
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'
import { GetBalancesResult, Options } from 'stakewise-methods'

import Methods from '../src/index'
import { config, fetchFiatRates } from '../src/util'

import { createAccount } from './helpers'

const { ethers } = require('hardhat')


let sender: string
let referrer: string

const getMethods = (options: Partial<Options> = {}) => (
  new Methods({
    sender,
    referrer,
    ...options,
    provider: ethers.provider,
  })
)

jest.setTimeout(30000)

describe('index.ts', () => {

  beforeAll(async () => {
    fetchMock.enableMocks()
    jest.dontMock('node-fetch')

    const [ account ] = await ethers.getSigners()

    const newAccount = await createAccount()

    sender = newAccount.address
    referrer = account.address
  })

  describe('getBalances', () => {

    it('creates instance of Methods with getBalances method', () => {
      const methods = getMethods()

      expect(typeof methods.getBalances).toEqual('function')
    })

    it('requests contracts on getBalances method call', async () => {
      const mockEth = parseEther('1')
      const balance = BigNumber.from(mockEth)

      const newAccount = await createAccount(balance)

      const methods = getMethods({
        sender: newAccount.address,
      })

      const fiatRates = await fetchFiatRates(methods.contracts.fiatRateContracts)

      const getMockResult = (number: number) => ({
        value: BigNumber.from(parseEther(number.toString())),
        fiatValues: {
          usd: number * Number(fiatRates.ethUsd.toFixed(2)),
          eur: number * Number(fiatRates.eurUsd.toFixed(2)),
          gbp: number * Number(fiatRates.gbpUsd.toFixed(2)),
        }
      })

      const mockResult: GetBalancesResult = {
        nativeTokenBalance: getMockResult(1),
        stakedTokenBalance: getMockResult(0),
        rewardTokenBalance: getMockResult(0),
        swiseTokenBalance: getMockResult(0),
      }

      const result = await methods.getBalances()

      expect(result).toEqual(mockResult)
    })
  })

  describe('getStakingApr', () => {

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

    it.skip('requests contracts and rest api on getStakingApr method call', async () => {
      const validatorsApr = faker.datatype.number({ min: 1, max: 20 })

      const mockData = {
        validators_apr: validatorsApr,
      }

      fetchMock.mockResponse(() => Promise.resolve({ body: JSON.stringify(mockData) }))

      const methods = getMethods()

      const result = await methods.getStakingApr()

      expect(fetchMock.mock.calls).toEqual([ [ `${config[config.defaultNetwork].api.rest}/pool-stats/`] ])
      expect(result).toBeLessThan(validatorsApr)
    })

    it('throws an error on getStakingApr method call', async () => {
      fetchMock.mockResponse(() => Promise.reject('Error'))

      const methods = getMethods()

      await expect(() => methods.getStakingApr()).rejects.toThrowError(/Fetch staking APR failed/)
    })
  })

  describe('deposit', () => {

    it('creates instance of Methods with deposit method', () => {
      const methods = getMethods()

      expect(typeof methods.deposit).toEqual('function')
    })
  })
})
