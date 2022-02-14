import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import config from './config'
import MulticallAbi from './abis/MulticallAbi.json'


const getContract = <T extends unknown>(
  address: string,
  abi: ContractInterface,
  library: Web3Provider
): T => {
  return new Contract(address, abi, library) as T
}

const getMulticallContract = (library: Web3Provider) => (
  getContract<any>(
    config.addresses.multicall,
    MulticallAbi,
    library
  )
)

const createContracts = (library: Web3Provider) => {
  const multicallContract = getMulticallContract(library)

  return {
    multicallContract,
  }
}


export default createContracts
