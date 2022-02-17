import MethodsType, {
  Options,
  GetBalancesResult,
} from 'stakewise-methods'
import { getAddress } from '@ethersproject/address'
import { config, validateOptions, createContracts } from './util'
import type { Contracts } from './util'


class Methods implements MethodsType {

  provider: Options['provider']
  address: Options['address']
  network: Options['network']
  referral: Options['referral']
  private contracts: Contracts

  constructor(options: Options) {
    validateOptions(options)

    const { provider, address, network, referral } = options

    this.provider = provider
    this.network = network || config.defaultNetwork
    this.address = getAddress(address)
    this.referral = getAddress(referral)
    this.contracts = createContracts(provider, this.network)
  }

  async getBalances(): Promise<GetBalancesResult> {
    const [
      nativeTokenBalance,
      stakedTokenBalance,
      rewardTokenBalance,
      swiseTokenBalance,
    ] = await Promise.all([
      this.provider.getBalance(this.address),
      this.contracts.stakedTokenContract.balanceOf(this.address),
      this.contracts.rewardTokenContract.balanceOf(this.address),
      this.contracts.swiseTokenContract.balanceOf(this.address),
    ])

    return {
      nativeTokenBalance,
      stakedTokenBalance,
      rewardTokenBalance,
      swiseTokenBalance,
    }
  }
}


export default Methods
