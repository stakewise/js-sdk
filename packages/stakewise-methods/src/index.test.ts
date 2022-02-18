import crypto from 'crypto'
import faker from '@faker-js/faker'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { GetBalancesResult } from 'stakewise-methods'

import Methods from './index'
import createContracts from './util/createContracts'


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

    it('creates instance of Methods with getStakingApr method', () => {
      const methods = getMethods()

      expect(typeof methods.getStakingApr).toEqual('function')
    })

    // it('requests contracts and rest api on getStakingApr method call', async () => {
    //   const mockResult = {
    //     activatedValidators: BigNumber.from(faker.datatype.number()),
    //     totalSupply: BigNumber.from(faker.datatype.number()),
    //     protocolFee: BigNumber.from(faker.datatype.number()),
    //   }
    //
    //   const mock = {
    //     poolContract: { activatedValidators: jest.fn(() => mockResult['activatedValidators']) },
    //     stakedTokenContract: { totalSupply: jest.fn(() => mockResult['totalSupply']) },
    //     rewardTokenContract: { protocolFee: jest.fn(() => mockResult['protocolFee']) },
    //   }
    //
    //   ;(createContracts as jest.Mock).mockImplementation(() => mock)
    //
    //   const methods = getMethods(mock.provider)
    //
    //   const result = await methods.getBalances()
    //
    //   expect(mock.provider.getBalance).toBeCalledWith(address)
    //   expect(mock.stakedTokenContract.balanceOf).toBeCalledWith(address)
    //   expect(mock.rewardTokenContract.balanceOf).toBeCalledWith(address)
    //   expect(mock.swiseTokenContract.balanceOf).toBeCalledWith(address)
    //   expect(result).toEqual(mockResult)
    // })

  })
})
