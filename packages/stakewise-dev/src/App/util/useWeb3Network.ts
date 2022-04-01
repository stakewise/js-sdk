import { useEffect, useState, useCallback, useRef } from 'react'
import { networkToChainId, chainIdToNetwork } from './config'


const useWeb3Network = ({ chainIds, networkField }) => {
  const [ web3ChainId, setWeb3ChainId ] = useState(null)

  useEffect(() => {
    if (window.ethereum) {
      // Change field network on metaMask network change
      window.ethereum.on('networkChanged', (stringChainId) => {
        const chainId = Number(stringChainId)

        setWeb3ChainId(Number(chainId))

        if (chainIds.includes(chainId)) {
          networkField.set(chainIdToNetwork[chainId])
        }
      })

      let interval

      // Get metaMask network on page load
      interval = setInterval(() => {
        const chainId = Number(window.ethereum.networkVersion)

        if (chainId) {
          clearInterval(interval)
          setWeb3ChainId(chainId)
        }
      }, 100)

      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
    }
  }, [ chainIds, networkField ])

  // Request changing metaMask network to the current field network value
  const requestNetworkChange = useCallback(() => {
    if (window.ethereum) {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [ { chainId: `0x${networkToChainId[networkField.state.value]}` } ],
      })
    }
  }, [])

  const isWrongNetwork = typeof web3ChainId === 'number' && !chainIds.includes(web3ChainId)

  // Request change metaMask network on wrong chain
  useEffect(() => {
    if (window.ethereum && isWrongNetwork) {
      requestNetworkChange()
    }
  }, [ isWrongNetwork, requestNetworkChange ])

  const web3ChainIdRef = useRef(web3ChainId)
  web3ChainIdRef.current = web3ChainId

  // Change metaMask network on field change
  useEffect(() => {
    if (window.ethereum) {
      const handleChange = (value) => {
        const chainId = value === 'mainnet' ? 1 : 5

        if (web3ChainIdRef.current !== chainId) {
          requestNetworkChange()
        }
      }

      networkField.on('change', handleChange)

      return () => {
        networkField.off('change', handleChange)
      }
    }
  }, [ networkField, requestNetworkChange ])

  return {
    web3ChainId,
    isWrongNetwork,
    requestNetworkChange,
  }
}


export default useWeb3Network
