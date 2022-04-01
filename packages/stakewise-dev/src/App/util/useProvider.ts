import useWeb3Provider from './useWeb3Provider'
import useEtherscanProvider from './useEtherscanProvider'


const useProvider = (networkField) => {
  const { etherscanProvider, etherscanAddress, etherscanAddressField } = useEtherscanProvider(networkField)
  const { web3Provider, web3Address, isConnecting, isWrongNetwork, requestNetworkChange, connect } = useWeb3Provider(networkField)

  if (window.ethereum) {
    return {
      provider: web3Provider,
      address: web3Address,
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
    addressField: etherscanAddressField,
    isWrongNetwork: false,
    isDepositDisabled: true,
  }
}


export default useProvider
