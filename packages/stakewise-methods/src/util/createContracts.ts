import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import config from './config'
import type { Network } from './config/types'
import type { Currency } from './fetchFiatRates'

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
  fiatRateContracts: Record<Currency, FiatRateAbiType>
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

const createContracts = (library: Web3Provider, network: Network): Contracts => {
  const addresses = config[network].addresses
  const poolContract = getPoolContract(library, addresses.pool)
  const swiseTokenContract = getSwiseTokenContract(library, addresses.swiseToken)
  const stakedTokenContract = getStakedEthTokenContract(library, addresses.stakedToken)
  const rewardTokenContract = getRewardEthTokenContract(library, addresses.rewardToken)
  const fiatRateContracts = {
    usd: getFiatRateContract(library, addresses.usdRate),
    eur: getFiatRateContract(library, addresses.eurRate),
    gbp: getFiatRateContract(library, addresses.gbpRate),
  }

  return {
    poolContract,
    swiseTokenContract,
    stakedTokenContract,
    rewardTokenContract,
    fiatRateContracts,
  }
}


export default createContracts
