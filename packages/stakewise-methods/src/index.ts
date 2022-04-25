import 'regenerator-runtime/runtime'

import { FeeData } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { getAddress } from '@ethersproject/address'
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


class Methods implements MethodsType {

  provider: Options['provider']
  sender: Options['sender']
  referrer: Options['referrer']
  network: Network
  contracts: Contracts

  constructor(options: Options) {
    validateOptions(options)

    const { provider, sender, referrer } = options

    this.provider = provider
    this.network = config.defaultNetwork
    this.sender = getAddress(sender)
    this.referrer = referrer ? getAddress(referrer) : undefined
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
        this.provider.getBalance(this.sender),
        this.contracts.stakedTokenContract.balanceOf(this.sender),
        this.contracts.rewardTokenContract.balanceOf(this.sender),
        this.contracts.swiseTokenContract.balanceOf(this.sender),
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
        protocolFee,
        poolStats,
      ]: [
        BigNumber,
        PoolStats,
      ] = await Promise.all([
        this.contracts.rewardTokenContract.protocolFee(),
        fetchPoolStats(networkConfig.api.rest),
      ])

      return {
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
        protocolFee,
        poolStats: {
          validatorsAPR,
        },
      } = data

      const maintainerFee = protocolFee.toNumber()

      return validatorsAPR - validatorsAPR * (maintainerFee / 10_000)
    }
    catch (error) {
      console.error(error)
      throw new Error('Get staking APR failed')
    }
  }

  private async estimateDepositGas({ amount, address }: EstimateGasProps): Promise<BigNumber> {
    try {
      const params = {
        from: this.sender,
        value: amount,
      }

      const stake = () => this.referrer
        ? this.contracts.poolContract.estimateGas.stakeWithReferrer(this.referrer, params)
        : this.contracts.poolContract.estimateGas.stake(params)

      const stakeOnBehalf = () => this.referrer
        ? this.contracts.poolContract.estimateGas.stakeWithReferrerOnBehalf(this.referrer, address, params)
        : this.contracts.poolContract.estimateGas.stakeOnBehalf(address, params)

      const value: BigNumber = await (
        address === this.sender
          ? stake()
          : stakeOnBehalf()
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

      const stake = () => this.referrer
        ? signedContract.stakeWithReferrer(this.referrer, params)
        : signedContract.stake(params)

      const stakeOnBehalf = () => this.referrer
        ? signedContract.stakeWithReferrerOnBehalf(this.referrer, address, params)
        : signedContract.stakeOnBehalf(address, params)

      const result = await (
        address === this.sender
          ? stake()
          : stakeOnBehalf()
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

      const address = providedAddress ? getAddress(providedAddress) : this.sender

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
