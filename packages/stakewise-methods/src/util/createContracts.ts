import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import config from './config'

import SwiseTokenAbi from './abis/SwiseTokenAbi.json'
import RewardEthTokenAbi from './abis/RewardEthTokenAbi.json'
import StakedEthTokenAbi from './abis/StakedEthTokenAbi.json'

import {
  SwiseTokenAbi as SwiseTokenAbiType,
  RewardEthTokenAbi as RewardEthTokenAbiType,
  StakedEthTokenAbi as StakedEthTokenAbiType,
} from './types'


export type Contracts = {
  swiseTokenContract: SwiseTokenAbiType
  stakedTokenContract: StakedEthTokenAbiType
  rewardTokenContract: RewardEthTokenAbiType
}

const getContract = <T extends unknown>(
  library: Web3Provider,
  address: string,
  abi: ContractInterface
): T => {
  return new Contract(address, abi, library) as T
}

const getStakedEthTokenContract = (library: Web3Provider, address: string) => (
  getContract<StakedEthTokenAbiType>(library, address, StakedEthTokenAbi)
)

const getRewardEthTokenContract = (library: Web3Provider, address: string) => (
  getContract<RewardEthTokenAbiType>(library, address, RewardEthTokenAbi)
)

const getSwiseTokenContract = (library: Web3Provider, address: string) => (
  getContract<SwiseTokenAbiType>(library, address, SwiseTokenAbi)
)

const createContracts = (library: Web3Provider, network: string): Contracts => {
  const addresses = config.addresses[network]
  const swiseTokenContract = getSwiseTokenContract(library, addresses.swiseToken)
  const stakedTokenContract = getStakedEthTokenContract(library, addresses.stakedToken)
  const rewardTokenContract = getRewardEthTokenContract(library, addresses.rewardToken)

  return {
    swiseTokenContract,
    stakedTokenContract,
    rewardTokenContract,
  }
}


export default createContracts
