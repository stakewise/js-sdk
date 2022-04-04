import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import config from './config'
import type { Rate } from './fetchFiatRates'
import type { Network, NetworkConfig } from './config/types'

import PoolAbi from './abis/PoolAbi.json'
import FiatRateAbi from './abis/FiatRateAbi.json'
import SwiseTokenAbi from './abis/SwiseTokenAbi.json'
import RewardEthTokenAbi from './abis/RewardEthTokenAbi.json'
import StakedEthTokenAbi from './abis/StakedEthTokenAbi.json'

import type {
  PoolAbi as PoolAbiType,
  FiatRateAbi as FiatRateAbiType,
  SwiseTokenAbi as SwiseTokenAbiType,
  RewardEthTokenAbi as RewardEthTokenAbiType,
  StakedEthTokenAbi as StakedEthTokenAbiType,
} from './types'


export type Contracts = {
  poolContract: PoolAbiType
  swiseTokenContract: SwiseTokenAbiType
  stakedTokenContract: StakedEthTokenAbiType
  rewardTokenContract: RewardEthTokenAbiType
  fiatRateContracts: Record<Rate, FiatRateAbiType>
}

const getContract = <T extends unknown>(
  library: Web3Provider,
  address: string,
  abi: ContractInterface
): T => {
  return new Contract(address, abi, library) as T
}

const getPoolContract = (library: Web3Provider, address: string) => (
  getContract<PoolAbiType>(library, address, PoolAbi)
)

const getStakedEthTokenContract = (library: Web3Provider, address: string) => (
  getContract<StakedEthTokenAbiType>(library, address, StakedEthTokenAbi)
)

const getRewardEthTokenContract = (library: Web3Provider, address: string) => (
  getContract<RewardEthTokenAbiType>(library, address, RewardEthTokenAbi)
)

const getSwiseTokenContract = (library: Web3Provider, address: string) => (
  getContract<SwiseTokenAbiType>(library, address, SwiseTokenAbi)
)

const getFiatRateContract = (library: Web3Provider, address: string) => (
  getContract<FiatRateAbiType>(library, address, FiatRateAbi)
)

const createContractsWithConfig = (library: Web3Provider, config: NetworkConfig): Contracts => {
  const addresses = config.addresses

  const poolContract = getPoolContract(library, addresses.pool)
  const swiseTokenContract = getSwiseTokenContract(library, addresses.swiseToken)
  const stakedTokenContract = getStakedEthTokenContract(library, addresses.stakedToken)
  const rewardTokenContract = getRewardEthTokenContract(library, addresses.rewardToken)
  const fiatRateContracts = {
    ethUsd: getFiatRateContract(library, addresses.ethUsdRate),
    eurUsd: getFiatRateContract(library, addresses.eurUsdRate),
    gbpUsd: getFiatRateContract(library, addresses.gbpUsdRate),
  }

  return {
    poolContract,
    swiseTokenContract,
    stakedTokenContract,
    rewardTokenContract,
    fiatRateContracts,
  }
}

const createContracts = (library: Web3Provider, network: Network): Contracts => (
  createContractsWithConfig(library, config[network])
)

export {
  createContractsWithConfig,
}

export default createContracts
