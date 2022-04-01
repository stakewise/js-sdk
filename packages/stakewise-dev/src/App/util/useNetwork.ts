import { useFieldState } from 'formular'
import { networkToChainId, chainIdToNetwork } from './config'


const useNetwork = (networkField) => {
  const { value: network } = useFieldState<string>(networkField)

  const chainIds = Object.keys(chainIdToNetwork).map(Number)
  const chainId = networkToChainId[network]

  return {
    network,
    chainIds,
    chainId,
  }
}


export default useNetwork
