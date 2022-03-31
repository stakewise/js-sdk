import { useMemo } from 'react'
import { providers } from 'ethers'
import useNetwork from './useNetwork'


const etherscanAddress = '0xed5dbc418eb6b7cb330f0df8fdb50a8772b8c4d0'

const useEtherscanProvider = (networkField) => {
  const { chainId } = useNetwork(networkField)

  const etherscanProvider = useMemo(() => {
    if (!window.ethereum) {
      return new providers.EtherscanProvider(chainId, 'URRTCG3RKWGV36FRGKBWWTRUZ84PUWRZUV')
    }
  }, [ chainId ])

  return {
    etherscanProvider,
    etherscanAddress,
  }
}


export default useEtherscanProvider
