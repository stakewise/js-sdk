import { parseEther } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'

import MethodsType, {
  Options,
  GetBalancesResult,
} from 'stakewise-methods'

import { config, validateOptions, createContracts, fetchPoolStats } from './util'
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
    ] = await Promise.all<BigNumber>([
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
    const networkConfig = config[this.network]

    const [
      activatedValidators,
      totalSupply,
      protocolFee,
      {
        validatorsAPR,
        activatedValidators: apiActivatedValidators,
      },
    ]: [
      BigNumber,
      BigNumber,
      BigNumber,
      {
        validatorsAPR: number
        activatedValidators: number
      }
    ] = await Promise.all([
      this.contracts.poolContract.activatedValidators(),
      this.contracts.stakedTokenContract.totalSupply(),
      this.contracts.rewardTokenContract.protocolFee(),
      fetchPoolStats(networkConfig.api.rest),
    ])

    const validatorsCount = Math.max(activatedValidators.toNumber(), apiActivatedValidators)
    const totalActivatedAmount = validatorDepositAmount.mul(validatorsCount)
    const stakingUtilization = totalActivatedAmount.mul(10000).div(totalSupply).toNumber() / 100
    const maintainerFee = protocolFee.toNumber()
    const poolAPR = validatorsAPR - validatorsAPR * (maintainerFee / 10_000)
    const stakingAPR = poolAPR * stakingUtilization / 100

    return Number(stakingAPR.toFixed(2))
  }
}


export default Methods
