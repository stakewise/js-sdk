import { useEffect, useState, useCallback } from 'react'


const useWeb3Connect = ({ networkField }) => {
  const [ { address, isConnecting, isConnected }, setState ] = useState({
    address: '',
    isConnected: false,
    isConnecting: true,
  })

  const connect = useCallback(() => (
    window.ethereum.enable()
      .then(([ address ]) => {
        const network = { 1: 'mainnet', 5: 'goerli' }[window.ethereum.networkVersion]

        // Set field network right after connect
        if (network) {
          networkField.set(network)
        }

        setState({ address, isConnected: true, isConnecting: false })
      })
      .catch(() => setState({ address: '', isConnected: false, isConnecting: false }))
  ), [])

  useEffect(() => {
    if (window.ethereum) {
      // Reconnect on metaMask disconnect
      window.ethereum.on('accountsChanged', () => {
        setState({ address: '', isConnected: false })
        connect()
      })

      // 5 sec delay before changing button (Open widget -> Connect wallet). To avoid quick buttons changing on page load
      const timeout = setTimeout(() => setState((state) => ({ ...state, isConnecting: false })), 5000)

      connect()
        .then(() => clearTimeout(timeout))

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [ connect ])

  return {
    address,
    isConnected,
    isConnecting,
    connect,
  }
}


export default useWeb3Connect
