import faker from '@faker-js/faker'
import fetchMock from 'jest-fetch-mock'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther, parseEther } from '@ethersproject/units'
import { GetBalancesResult } from 'stakewise-methods'

const { ethers } = require('hardhat')

import Methods from '../src/index'
import { config, createContracts } from '../src/util'
import { createAccount } from './helpers'


let address: string
let referral: string

const randomNumber = faker.datatype.number({ min: 1, max: 100 })
const balance = BigNumber.from(parseEther(randomNumber.toString()))

const getMethods = (options = {}) => (
  new Methods({
    address,
    referral,
    ...options,
    provider: ethers.provider,
  })
)


jest.setTimeout(30000)
jest.mock('../src/util/createContracts')

describe('index.ts with mock', () => {

  beforeAll(async () => {
    const [ account ] = await ethers.getSigners()

    const newAccount = await createAccount(balance)

    address = newAccount.address
    referral = account.address
  })

  describe('getBalances', () => {

    it('throws an error on getBalances method call', async () => {
      const mock = {
        fiatRateContracts: {
          usd: { latestAnswer: () => Promise.reject() },
          eur: { latestAnswer: () => Promise.reject() },
          gbp: { latestAnswer: () => Promise.reject() },
        },
        stakedTokenContract: { balanceOf: () => Promise.reject() },
        rewardTokenContract: { balanceOf: () => Promise.reject() },
        swiseTokenContract: { balanceOf: () => Promise.reject() },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      await expect(() => methods.getBalances()).rejects.toThrowError(/Fetch balances failed/)
    })

    it('requests contracts on getBalances method call', async () => {
      const getMockResult = (val?: BigNumber) => {
        const value = val || BigNumber.from(0)
        const number = Number(formatEther(value))

        return ({
          value,
          fiatValues: {
            usd: number * 2000,
            eur: number * 1600,
            gbp: number * 1250,
          }
        })
      }

      const mockFiatRates = {
        ethUsd: BigNumber.from(2000 * 100_000_000),
        eurUsd: BigNumber.from(125_000_000),
        gbpUsd: BigNumber.from(160_000_000),
      }

      const mockResult: GetBalancesResult = {
        nativeTokenBalance: getMockResult(balance),
        stakedTokenBalance: getMockResult(),
        rewardTokenBalance: getMockResult(),
        swiseTokenBalance: getMockResult(),
      }

      const mock = {
        fiatRateContracts: {
          ethUsd: { latestAnswer: jest.fn(() => mockFiatRates['ethUsd']) },
          eurUsd: { latestAnswer: jest.fn(() => mockFiatRates['eurUsd']) },
          gbpUsd: { latestAnswer: jest.fn(() => mockFiatRates['gbpUsd']) },
        },
        stakedTokenContract: { balanceOf: jest.fn(() => mockResult['stakedTokenBalance'].value) },
        rewardTokenContract: { balanceOf: jest.fn(() => mockResult['rewardTokenBalance'].value) },
        swiseTokenContract: { balanceOf: jest.fn(() => mockResult['swiseTokenBalance'].value) },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      const result = await methods.getBalances()

      expect(mock.stakedTokenContract.balanceOf).toBeCalledWith(address)
      expect(mock.rewardTokenContract.balanceOf).toBeCalledWith(address)
      expect(mock.swiseTokenContract.balanceOf).toBeCalledWith(address)
      expect(mock.fiatRateContracts.ethUsd.latestAnswer).toBeCalledTimes(1)
      expect(mock.fiatRateContracts.eurUsd.latestAnswer).toBeCalledTimes(1)
      expect(mock.fiatRateContracts.gbpUsd.latestAnswer).toBeCalledTimes(1)
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

    it('requests contracts and rest api on getStakingApr method call', async () => {
      const activatedValidators = faker.datatype.number()
      const protocolFee = faker.datatype.number({ min: 1, max: 20 })
      const validatorsApr = faker.datatype.number({ min: 1, max: 20 })
      const totalSupplyPercent = faker.datatype.number({ min: 80, max: 99 })
      const totalSupply = parseEther('32')
        .mul(activatedValidators)
        .div(100)
        .mul(totalSupplyPercent)

      const mockData = {
        activation_duration: faker.datatype.number(),
        activated_validators: activatedValidators,
        validators_apr: validatorsApr,
      }

      fetchMock.mockResponse(() => Promise.resolve({ body: JSON.stringify(mockData) }))

      const mock = {
        poolContract: { activatedValidators: jest.fn(() => BigNumber.from(activatedValidators)) },
        stakedTokenContract: { totalSupply: jest.fn(() => totalSupply) },
        rewardTokenContract: { protocolFee: jest.fn(() => BigNumber.from(protocolFee)) },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      const result = await methods.getStakingApr()

      expect(mock.poolContract.activatedValidators).toBeCalledWith()
      expect(mock.stakedTokenContract.totalSupply).toBeCalledWith()
      expect(mock.rewardTokenContract.protocolFee).toBeCalledWith()
      expect(fetchMock.mock.calls).toEqual([ [ `${config[config.defaultNetwork].api.rest}/pool-stats/`] ])
      expect(result).toBeGreaterThan(validatorsApr)
    })

    it('throws an error on getStakingApr method call', async () => {
      const mock = {
        poolContract: { activatedValidators: () => Promise.reject() },
        stakedTokenContract: { totalSupply: () => Promise.reject() },
        rewardTokenContract: { protocolFee: () => Promise.reject() },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      await expect(() => methods.getStakingApr()).rejects.toThrowError(/Fetch staking APR failed/)
    })
  })

  describe('deposit', () => {

    it('sends ETH on deposit method call', async () => {
      const response = { hash: faker.random.randomWord() }
      const amount = BigNumber.from(faker.datatype.number())
      const gasPrice = BigNumber.from(faker.datatype.number())

      const mock = {
        poolContract: {
          estimateGas: {
            stake: () => Promise.resolve(gasPrice),
          },
          connect: () => ({
            stake: () => Promise.resolve(response),
          }),
        },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      const result = await methods.deposit({ amount })

      expect(result).toEqual(response)
    })

    it('sends ETH to another address on deposit method call', async () => {
      const response = { hash: faker.random.randomWord() }
      const amount = BigNumber.from(faker.datatype.number())
      const gasPrice = BigNumber.from(faker.datatype.number())

      const mock = {
        poolContract: {
          estimateGas: {
            stakeOnBehalf: () => Promise.resolve(gasPrice),
          },
          connect: () => ({
            stakeOnBehalf: () => Promise.resolve(response),
          }),
        },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      const result = await methods.deposit({
        address: referral,
        amount,
      })

      expect(result).toEqual(response)
    })

    it('throws an error on estimateDepositGas', async () => {
      const errors: string[] = []
      const amount = BigNumber.from(faker.datatype.number())

      console.error = jest.fn((error) => errors.push(error.message))

      const mock = {
        poolContract: {
          estimateGas: {
            stake: () => Promise.reject('Error'),
          },
        },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      await expect(() => methods.deposit({ amount })).rejects.toThrowError(/Deposit failed/)
      expect(errors.includes('Estimate deposit gas failed')).toEqual(true)
    })

    it('throws an error on sendDeposit', async () => {
      const errors: string[] = []
      const amount = BigNumber.from(faker.datatype.number())
      const gasPrice = BigNumber.from(faker.datatype.number())

      console.error = jest.fn((error) => errors.push(error.message))

      const mock = {
        poolContract: {
          estimateGas: {
            stake: () => Promise.resolve(gasPrice),
          },
          connect: () => ({
            stake: () => Promise.reject('Error'),
          }),
        },
      }

      ;(createContracts as jest.Mock).mockImplementation(() => mock)

      const methods = getMethods()

      await expect(() => methods.deposit({ amount })).rejects.toThrowError(/Deposit failed/)
      expect(errors.includes('Send deposit failed')).toEqual(true)
    })
  })
})
