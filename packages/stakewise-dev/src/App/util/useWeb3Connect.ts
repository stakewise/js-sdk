import { useEffect, useState, useCallback } from 'react'


const useWeb3Connect = ({ networkField }) => {
  const [ { address, isConnected }, setState ] = useState({
    address: '',
    isConnected: false,
  })

  const connect = useCallback(() => (
    window.ethereum.enable()
      .then(([ address ]) => {
        const network = { 1: 'mainnet', 5: 'goerli' }[window.ethereum.networkVersion]

        // Set field network right after connect
        if (network) {
          networkField.set(network)
        }

        setState({ address, isConnected: true })
      })
      .catch(() => setState({ address: '', isConnected: false }))
  ), [])

  useEffect(() => {
    if (window.ethereum) {
      // Reconnect on metaMask disconnect
      window.ethereum.on('accountsChanged', () => {
        setState({ address: '', isConnected: false })
        connect()
      })

      connect()
    }
  }, [ connect ])

  return {
    address,
    isConnected,
    connect,
  }
}


export default useWeb3Connect
