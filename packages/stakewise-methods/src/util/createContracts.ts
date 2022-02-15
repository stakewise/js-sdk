import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import config from './config'

import MulticallAbi from './abis/MulticallAbi.json'
import SwiseTokenAbi from './abis/SwiseTokenAbi.json'
import RewardEthTokenAbi from './abis/RewardEthTokenAbi.json'
import StakedEthTokenAbi from './abis/StakedEthTokenAbi.json'

import { MulticallAbi as MulticallAbiType } from './types'
import { SwiseTokenAbi as SwiseTokenAbiType } from './types'
import { RewardEthTokenAbi as RewardEthTokenAbiType } from './types'
import { StakedEthTokenAbi as StakedEthTokenAbiType } from './types'


export type Contracts = {
  multicallContract: MulticallAbiType
  swiseTokenContract: SwiseTokenAbiType
  stakedTokenContract: StakedEthTokenAbiType
  rewardTokenContract: RewardEthTokenAbiType
}

const getContract = <T extends unknown>(
  address: string,
  abi: ContractInterface,
  library: Web3Provider
): T => {
  return new Contract(address, abi, library) as T
}

const getMulticallContract = (library: Web3Provider) => (
  getContract<MulticallAbiType>(
    config.addresses.multicall,
    MulticallAbi,
    library
  )
)

const getStakedEthTokenContract = (library: Web3Provider) => (
  getContract<StakedEthTokenAbiType>(
    config.addresses.stakedToken,
    StakedEthTokenAbi,
    library
  )
)

const getRewardEthTokenContract = (library: Web3Provider) => (
  getContract<RewardEthTokenAbiType>(
    config.addresses.rewardToken,
    RewardEthTokenAbi,
    library
  )
)

const getSwiseTokenContract = (library: Web3Provider) => (
  getContract<SwiseTokenAbiType>(
    config.addresses.swiseToken,
    SwiseTokenAbi,
    library
  )
)

const createContracts = (library: Web3Provider): Contracts => {
  const multicallContract = getMulticallContract(library)
  const swiseTokenContract = getSwiseTokenContract(library)
  const stakedTokenContract = getStakedEthTokenContract(library)
  const rewardTokenContract = getRewardEthTokenContract(library)

  return {
    multicallContract,
    swiseTokenContract,
    stakedTokenContract,
    rewardTokenContract,
  }
}


export default createContracts
