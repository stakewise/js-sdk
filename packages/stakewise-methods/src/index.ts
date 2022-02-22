import { parseEther } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'

import MethodsType, {
  Options,
  GetBalancesResult, DepositProps,
} from 'stakewise-methods'

import {
  config,
  createContracts,
  fetchPoolStats,
  validateOptions,
  validateDepositProps,
} from './util'
import type { Contracts, Network, FetchPoolStatsResult } from './util'


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
    try {
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
    catch (error) {
      console.log(error)
      throw new Error('Get balances failed')
    }
  }

  private async fetchStakingApr(): Promise<[
    BigNumber,
    BigNumber,
    BigNumber,
    FetchPoolStatsResult,
  ]> {
    try {
      const networkConfig = config[this.network]

      const data = await Promise.all([
        this.contracts.poolContract.activatedValidators(),
        this.contracts.stakedTokenContract.totalSupply(),
        this.contracts.rewardTokenContract.protocolFee(),
        fetchPoolStats(networkConfig.api.rest),
      ])

      return data
    }
    catch (error) {
      console.error(error)
      throw new Error('Fetch staking APR failed')
    }
  }

  async getStakingApr(): Promise<number> {
    const data = await this.fetchStakingApr()

    try {
      const [
        activatedValidators,
        totalSupply,
        protocolFee,
        {
          validatorsAPR,
          activatedValidators: apiActivatedValidators,
        },
      ] = data

      const validatorsCount = Math.max(activatedValidators.toNumber(), apiActivatedValidators)
      const totalActivatedAmount = validatorDepositAmount.mul(validatorsCount)
      const stakingUtilization = totalActivatedAmount.mul(10000).div(totalSupply).toNumber() / 100

      const maintainerFee = protocolFee.toNumber()
      const poolAPR = validatorsAPR - validatorsAPR * (maintainerFee / 10_000)
      const stakingAPR = poolAPR * stakingUtilization / 100

      return Number(stakingAPR.toFixed(2))
    }
    catch (error) {
      console.error(error)
      throw new Error('Get staking APR failed')
    }
  }

  async deposit(props: DepositProps): Promise<void> {
    try {
      validateDepositProps(props)

      const { amount, address = this.address } = props

    }
    catch (error) {
      console.error(error)
      throw new Error('Deposit failed')
    }
  }
}


export default Methods
