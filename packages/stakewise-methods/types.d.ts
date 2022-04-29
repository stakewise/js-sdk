declare module '@stakewise/methods' {
  import { BigNumber } from '@ethersproject/bignumber'
  import { Web3Provider } from '@ethersproject/providers'
  import { ContractTransaction } from 'ethers'
  import { Network, FiatValues, PoolStats } from './src/util'

  export type Options = {
    provider: Web3Provider
    sender: string
    referrer?: string
    network?: Network
  }

  export type TokenValue = {
    value: BigNumber
    fiatValues: FiatValues
  }

  export type TokenBalanceName = 'swiseTokenBalance' | 'rewardTokenBalance' | 'stakedTokenBalance' | 'nativeTokenBalance'

  export type FetchBalancesResult = {
    balances: Record<TokenBalanceName, BigNumber>
    fiatRates: FiatRates
  }

  export type GetBalancesResult = Record<TokenBalanceName, TokenValue>

  export type FetchStakingAprResult = {
    protocolFee: BigNumber
    poolStats: PoolStats
  }

  export type DepositProps = {
    address?: string
    amount: BigNumber
  }

  export type EstimateGasProps = {
    address: string
    amount: BigNumber
  }

  export type SendDepositProps = EstimateGasProps & {
    gasLimit: BigNumber
    maxFeePerGas?: BigNumber
    maxPriorityFeePerGas?: BigNumber
  }

  export default class Methods {
    provider: Options['provider']
    sender: Options['sender']
    referrer: Options['referrer']
    network: Options['network']

    constructor(options: Options)
    getBalances(): Promise<GetBalancesResult>
    getStakingApr(): Promise<number>
    deposit(props: DepositProps): Promise<ContractTransaction>
  }
}
