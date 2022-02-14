import { BigNumber } from '@ethersproject/bignumber'
import MethodsType, {
  Options,
  GetBalancesResult,
} from 'stakewise-methods'
import { config, validateOptions, createContracts } from './util'


class Methods implements MethodsType {

  provider: Options['provider']
  address: Options['address']
  network: Options['network']
  referral: Options['referral']
  contracts: Record<string, any>

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
    const eth = await this.contracts.multicallContract.getEthBalance(this.address)
    const stakedTokenBalance = await contracts.stakedTokenContract.balanceOf(address)
    const swise = await contracts.swiseTokenContract.balanceOf(address)

    return {
      sETH2: BigNumber.from('0'),
      rETH2: BigNumber.from('0'),
      SWISE: BigNumber.from('0'),
    }
  }
}


export default Methods
