import faker from '@faker-js/faker'
import fetchMock from 'jest-fetch-mock'
import { BigNumber } from '@ethersproject/bignumber'
import { GetBalancesResult } from 'stakewise-methods'

import Methods from '../src/index'
import { config } from '../src/util'

import { createAccount } from './helpers'

const { ethers } = require('hardhat')


let address: string
let referral: string

const getMethods = (options = {}) => (
  new Methods({
    address,
    referral,
    ...options,
    provider: ethers.provider,
  })
)


describe('index.ts', () => {

  beforeAll(async () => {
    const [ account ] = await ethers.getSigners()

    const newAccount = await createAccount()

    address = newAccount.address
    referral = account.address
  })

  describe('getBalances', () => {

    it('creates instance of Methods with getBalances method', () => {
      const methods = getMethods()

      expect(typeof methods.getBalances).toEqual('function')
    })

    it('requests contracts on getBalances method call', async () => {
      const mockResult: GetBalancesResult = {
        nativeTokenBalance: BigNumber.from(0),
        stakedTokenBalance: BigNumber.from(0),
        rewardTokenBalance: BigNumber.from(0),
        swiseTokenBalance: BigNumber.from(0),
      }

      const methods = getMethods()

      const result = await methods.getBalances()

      expect(result).toEqual(mockResult)
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
      const activatedValidators = faker.datatype.number()
      const validatorsApr = faker.datatype.number({ min: 1, max: 20 })

      const mockData = {
        activation_duration: faker.datatype.number(),
        activated_validators: activatedValidators,
        validators_apr: validatorsApr,
      }

      fetchMock.mockResponse(() => Promise.resolve({ body: JSON.stringify({ data: mockData }) }))

      const methods = getMethods()

      const result = await methods.getStakingApr()

      expect(fetchMock.mock.calls).toEqual([ [ `${config[config.defaultNetwork].api.rest}/pool-stats/`] ])
      expect(result).toBeGreaterThan(validatorsApr)
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
