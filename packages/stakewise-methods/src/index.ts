import MethodsType, {
  Options,
  GetBalancesResult,
} from 'stakewise-methods'
import { parseEther } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import { config, validateOptions, createContracts } from './util'
import type { Contracts, Network } from './util'


const validatorDepositAmount = parseEther('32')

class Methods implements MethodsType {

  provider: Options['provider']
  address: Options['address']
  referral: Options['referral']
  network: Network
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

  async getStakingApr(): Promise<number> {
    const poolAddress = config[this.network].addresses.pool

    const [
      poolPaused,
      pendingValidators,
      minActivatingDeposit,
      pendingValidatorsLimit,
      totalSupply,
      protocolFee,
      temporaryPoolBalance,
    ] = await Promise.all([
      this.contracts.poolContract.paused(),
      this.contracts.poolContract.pendingValidators(),
      this.contracts.poolContract.activatedValidators(),
      this.contracts.poolContract.minActivatingDeposit(),
      this.contracts.poolContract.pendingValidatorsLimit(),
      this.contracts.stakedTokenContract.totalSupply(),
      this.contracts.rewardTokenContract.protocolFee(),
      this.contracts.multicallContract.getEthBalance(poolAddress),
    ])

    return 0
  }
}


export default Methods
