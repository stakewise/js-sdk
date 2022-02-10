declare module 'stakewise-methods' {
  import { BigNumber } from '@ethersproject/bignumber'

  export type Options = {
    provider: Record<string, any>
    address: string
    referral: string
  }

  export type GetBalancesResult = {
    sETH2: BigNumber
    rETH2: BigNumber
    SWISE: BigNumber
  }

  export default class Methods {
    constructor(options: Options)
    getBalances(): Promise<GetBalancesResult>
  }
}
