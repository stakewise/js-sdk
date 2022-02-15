declare module 'stakewise-methods' {
  import { BigNumber } from '@ethersproject/bignumber'
  import { Web3Provider } from '@ethersproject/providers'

  export type Options = {
    provider: Web3Provider
    address: string
    referral: string
    network?: 'mainnet'
  }

  export type GetBalancesResult = {
    swiseTokenBalance: BigNumber
    rewardTokenBalance: BigNumber
    stakedTokenBalance: BigNumber
    nativeTokenBalance: BigNumber
  }

  export default class Methods {
    constructor(options: Options)
    getBalances(): Promise<GetBalancesResult>
  }
}
