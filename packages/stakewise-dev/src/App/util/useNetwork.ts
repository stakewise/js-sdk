import { useFieldState } from 'formular'


const useNetwork = (networkField) => {
  const { value: network } = useFieldState(networkField)

  const chainIds = [ 1, 5 ]
  const chainId = { goerli: 5, mainnet: 1 }[network]

  return {
    network,
    chainIds,
    chainId,
  }
}


export default useNetwork
