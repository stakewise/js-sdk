import { BigNumber } from '@ethersproject/bignumber'
import { Signer } from '@ethersproject/abstract-signer'
import { ChainId } from '../common'
import { PoolContract } from '../contracts'
import { Pool } from './pool'

describe('Pool', () => {
  describe('stake', () => {
    const provider = { _isSigner: true } as Signer
    provider.getChainId = jest.fn(async () => ChainId.Mainnet)
    provider.estimateGas = jest.fn(async () => BigNumber.from(1000))
    provider.sendTransaction = jest.fn(async () => ({
      hash: '0x0123456789',
      confirmations: 100,
      from: '0x1111111111',
      nonce: 1,
      gasLimit: BigNumber.from(1000),
      data: '0x0000000000',
      value: BigNumber.from(32),
      chainId: ChainId.Mainnet,
      wait: jest.fn(),
    }))

    const pool = new Pool({ provider })

    it('sends stake transaction', async () => {
      expect(await pool.stake({ value: 32 })).toEqual({ hash: '0x0123456789' })
      expect(provider.estimateGas).toBeCalledWith({
        chainId: ChainId.Mainnet,
        data: PoolContract.getStakeCalldata(),
        to: PoolContract.getAddress(ChainId.Mainnet),
        value: BigNumber.from(32),
      })
      expect(provider.sendTransaction).toBeCalledWith({
        chainId: ChainId.Mainnet,
        data: PoolContract.getStakeCalldata(),
        gasLimit: BigNumber.from(1000),
        to: PoolContract.getAddress(ChainId.Mainnet),
        value: BigNumber.from(32),
      })
    })
  })
})
