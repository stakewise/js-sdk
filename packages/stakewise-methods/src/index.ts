import 'regenerator-runtime/runtime'

import { FeeData } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { getAddress } from '@ethersproject/address'
import { parseEther } from '@ethersproject/units'
import type { ContractTransaction } from 'ethers'

import MethodsType, {
  Options,
  DepositProps,
  TokenBalanceName,
  EstimateGasProps,
  SendDepositProps,
  GetBalancesResult,
  FetchBalancesResult,
  FetchStakingAprResult,
} from 'stakewise-methods'

import {
  config,
  createContracts,
  validateOptions,
  validateDepositProps,
  fetchPoolStats,
  fetchFiatRates,
  getFiatValues,
} from './util'
import type { Contracts, Network, FiatRates, PoolStats } from './util'


const validatorDepositAmount = parseEther('32')

class Methods implements MethodsType {

  provider: Options['provider']
  address: Options['address']
  referral: Options['referral']
  network: Network
  contracts: Contracts

  constructor(options: Options) {
    validateOptions(options)

    const { provider, address, referral } = options

    this.provider = provider
    this.network = config.defaultNetwork
    this.address = getAddress(address)
    this.referral = getAddress(referral)
    this.contracts = createContracts(provider, this.network)
  }

  async fetchBalances(): Promise<FetchBalancesResult> {
    try {
      const [
        nativeTokenBalance,
        stakedTokenBalance,
        rewardTokenBalance,
        swiseTokenBalance,
        fiatRates,
      ]: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        FiatRates,
      ] = await Promise.all([
        this.provider.getBalance(this.address),
        this.contracts.stakedTokenContract.balanceOf(this.address),
        this.contracts.rewardTokenContract.balanceOf(this.address),
        this.contracts.swiseTokenContract.balanceOf(this.address),
        fetchFiatRates(this.contracts.fiatRateContracts)
      ])

      const result = {
        fiatRates,
        balances: {
          nativeTokenBalance,
          stakedTokenBalance,
          rewardTokenBalance,
          swiseTokenBalance,
        },
      }

      return result
    }
    catch (error) {
      console.error(error)
      throw new Error('Fetch balances failed')
    }
  }

  async getBalances(): Promise<GetBalancesResult> {
    const data = await this.fetchBalances()

    try {
      const { balances, fiatRates } = data

      const result = {} as GetBalancesResult
      const tokenBalanceNames = Object.keys(balances) as TokenBalanceName[]

      tokenBalanceNames.forEach((tokenBalanceName) => {
        const value = balances[tokenBalanceName]
        const fiatValues = getFiatValues({ value, fiatRates })

        result[tokenBalanceName] = {
          value,
          fiatValues,
        }
      })

      return result
    }
    catch (error) {
      console.error(error)
      throw new Error('Get balances failed')
    }
  }

  private async fetchStakingApr(): Promise<FetchStakingAprResult> {
    try {
      const networkConfig = config[this.network]

      const [
        activatedValidators,
        totalSupply,
        protocolFee,
        poolStats,
      ]: [
        BigNumber,
        BigNumber,
        BigNumber,
        PoolStats,
      ] = await Promise.all([
        this.contracts.poolContract.activatedValidators(),
        this.contracts.stakedTokenContract.totalSupply(),
        this.contracts.rewardTokenContract.protocolFee(),
        fetchPoolStats(networkConfig.api.rest),
      ])

      return {
        activatedValidators,
        totalSupply,
        protocolFee,
        poolStats,
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('Fetch staking APR failed')
    }
  }

  async getStakingApr(): Promise<number> {
    const data = await this.fetchStakingApr()

    try {
      const {
        activatedValidators,
        totalSupply,
        protocolFee,
        poolStats: {
          validatorsAPR,
          activatedValidators: apiActivatedValidators,
        },
      } = data

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

  private async estimateDepositGas({ amount, address }: EstimateGasProps): Promise<BigNumber> {
    try {
      const params = {
        from: this.address,
        value: amount,
      }

      const value: BigNumber = await (
        address === this.address
          ? this.contracts.poolContract.estimateGas.stake(params)
          : this.contracts.poolContract.estimateGas.stakeOnBehalf(address, params)
      )

      const gasLimit = value
        .mul(10000)
        .add(1000)
        .div(10000)

      return gasLimit
    }
    catch (error) {
      console.error(error)
      throw new Error('Estimate deposit gas failed')
    }
  }

  private async sendDeposit(props: SendDepositProps): Promise<ContractTransaction> {
    try {
      const { amount, address, gasLimit, maxFeePerGas, maxPriorityFeePerGas } = props

      const signer = this.provider.getUncheckedSigner(address)
      const signedContract = this.contracts.poolContract.connect(signer)

      const params: Parameters<typeof signedContract.stake>[0] = {
        value: amount,
        gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
      }

      const result = await (
        address === this.address
          ? signedContract.stake(params)
          : signedContract.stakeOnBehalf(address, params)
      )

      return result
    }
    catch (error) {
      console.error(error)
      throw new Error('Send deposit failed')
    }
  }

  async deposit(props: DepositProps): Promise<ContractTransaction> {
    try {
      validateDepositProps(props)

      const { amount, address: providedAddress } = props

      const address = providedAddress ? getAddress(providedAddress) : this.address

      const [
        gasLimit,
        feeData,
      ]: [
        BigNumber,
        FeeData
      ] = await Promise.all([
        this.estimateDepositGas({ amount, address }),
        this.provider.getFeeData(),
      ])

      if (!gasLimit) throw new Error('Gas limit is empty')
      if (!feeData) throw new Error('Fee data is empty')

      const { maxFeePerGas, maxPriorityFeePerGas } = feeData

      const result = await this.sendDeposit({
        address,
        amount,
        gasLimit,
        maxFeePerGas: maxFeePerGas || undefined,
        maxPriorityFeePerGas: maxPriorityFeePerGas || undefined,
      })

      return result
    }
    catch (error) {
      console.error(error)
      throw new Error('Deposit failed')
    }
  }
}


export default Methods
