declare module 'stakewise-methods' {
  import { BigNumber } from '@ethersproject/bignumber'
  import { Web3Provider } from '@ethersproject/providers'
  import { Network } from './src/util/config'

  export type Options = {
    provider: Web3Provider
    address: string
    referral: string
    network?: Network
  }

  export type GetBalancesResult = {
    swiseTokenBalance: BigNumber
    rewardTokenBalance: BigNumber
    stakedTokenBalance: BigNumber
    nativeTokenBalance: BigNumber
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
    constructor(options: Options)
    getBalances(): Promise<GetBalancesResult>
    getStakingApr(): Promise<number>
    deposit(props: DepositProps): Promise<void>
  }
}
