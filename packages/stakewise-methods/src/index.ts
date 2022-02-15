import MethodsType, {
  Options,
  GetBalancesResult,
} from 'stakewise-methods'
import { config, validateOptions, createContracts } from './util'
import type { Contracts } from './util'


class Methods implements MethodsType {

  provider: Options['provider']
  address: Options['address']
  network: Options['network']
  referral: Options['referral']
  contracts: Contracts

  constructor(options: Options) {
    validateOptions(options)

    const { provider, address, network, referral } = options

    this.provider = provider
    this.address = address
    this.network = network || config.defaultNetwork
    this.referral = referral
    this.contracts = createContracts(provider)
  }

  async getBalances(): Promise<GetBalancesResult> {
    const [ ETH, sETH2, rETH2, SWISE ] = await Promise.all([
      this.contracts.multicallContract.getEthBalance(this.address),
      this.contracts.stakedTokenContract.balanceOf(this.address),
      this.contracts.rewardTokenContract.balanceOf(this.address),
      this.contracts.swiseTokenContract.balanceOf(this.address),
    ])

    return {
      nativeTokenBalance: ETH,
      stakedTokenBalance: sETH2,
      rewardTokenBalance: rETH2,
      swiseTokenBalance: SWISE,
    }
  }
}


export default Methods
