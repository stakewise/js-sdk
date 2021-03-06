import { useMemo } from 'react'
import { providers } from 'ethers'

import useNetwork from './useNetwork'
import useWeb3Connect from './useWeb3Connect'
import useWeb3Network from './useWeb3Network'


const useWeb3Provider = (networkField) => {
  const { chainIds } = useNetwork(networkField)
  const { address, isConnecting, connect } = useWeb3Connect({ networkField })
  const { web3ChainId, isWrongNetwork, requestNetworkChange } = useWeb3Network({ chainIds, networkField })

  const provider = useMemo(() => {
    if (window.ethereum) {
      return new providers.Web3Provider(window.ethereum)
    }
  }, [ web3ChainId ])

  return {
    web3Provider: provider,
    web3Address: address,
    isConnecting,
    isWrongNetwork,

    connect,
    requestNetworkChange,
  }
}


export default useWeb3Provider
