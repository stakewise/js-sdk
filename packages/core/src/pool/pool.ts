import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { BigNumberish } from '@ethersproject/bignumber'
import { isChainId } from '../common'
import { PoolContract, PoolContractStakeOptions } from '../contracts'
import { calculateGasMargin, precondition, validateBigNumber } from '../utils'

/**
 * Describes options to stake in a pool.
 */
export type PoolStakeOptions = PoolContractStakeOptions & {
  /**
   * Amount of Eth to stake.
   */
  value: BigNumberish
}

/**
 * Describes a stake transaction in a pool.
 */
export type PoolStakeResponse = {
  /**
   * A transaction hash.
   */
  hash: string
}

/**
 * Describes parameters to create a pool.
 */
export type PoolParameters = {
  /**
   * Web3 provider to access the chain.
   */
  provider: Provider | Signer
}

export class Pool {
  private _provider: Provider | Signer

  constructor(parameters: PoolParameters) {
    precondition(parameters.provider, 'Provider or signer is not set')
    this._provider = parameters.provider
  }

  private get signer(): Signer {
    precondition(Signer.isSigner(this._provider), 'No signer is set')
    return this._provider as Signer
  }

  private get provider(): Provider {
    if (Signer.isSigner(this._provider)) {
      const signer = this._provider as Signer
      const provider = signer.provider
      precondition(provider, 'Signer is not connected to a provider')
      return provider
    } else {
      precondition(Provider.isProvider(this._provider), 'No provider is set')
      return this._provider
    }
  }

  /**
   * Stakes Eth into a pool.
   * @param options Staking options
   * @returns Transaction response
   */
  async stake(options: PoolStakeOptions): Promise<PoolStakeResponse> {
    const chainId = await this.signer.getChainId()
    precondition(isChainId(chainId), `${chainId} is not a valid chain id`)
    const value = validateBigNumber(options.value)
    const data = PoolContract.getStakeCalldata(options)
    const to = PoolContract.getAddress(chainId)
    const estimateGasLimit = await this.signer.estimateGas({
      to,
      data,
      value,
      chainId,
    })
    const gasLimit = calculateGasMargin(estimateGasLimit)
    const response = await this.signer.sendTransaction({
      to,
      data,
      value,
      chainId,
      gasLimit,
    })
    return {
      hash: response.hash,
    }
  }
}
