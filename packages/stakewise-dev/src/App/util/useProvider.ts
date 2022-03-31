import useWeb3Provider from './useWeb3Provider'
import useEtherscanProvider from './useEtherscanProvider'


const useProvider = (networkField) => {
  const { etherscanProvider, etherscanAddress } = useEtherscanProvider(networkField)
  const { web3Provider, web3Address, isConnected, isConnecting, isWrongNetwork, requestNetworkChange, connect } = useWeb3Provider(networkField)

  if (window.ethereum) {
    return {
      provider: web3Provider,
      address: web3Address,
      isConnected,
      isConnecting,
      isWrongNetwork,
      isDepositDisabled: false,

      connect,
      requestNetworkChange,
    }
  }

  return {
    provider: etherscanProvider,
    address: etherscanAddress,
    isConnected: true,
    isWrongNetwork: false,
    isDepositDisabled: true,
  }
}


export default useProvider
