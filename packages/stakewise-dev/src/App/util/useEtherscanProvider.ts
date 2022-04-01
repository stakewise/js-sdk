import { useMemo } from 'react'
import { providers } from 'ethers'
import { useField, useFieldState } from 'formular'

import { isAddress, required } from '../components/Input/util/validate'
import useNetwork from './useNetwork'


const initialAddress = '0xed5dbc418eb6b7cb330f0df8fdb50a8772b8c4d0'

const useEtherscanProvider = (networkField) => {
  const { chainId } = useNetwork(networkField)

  const etherscanAddressField = useField({
    value: initialAddress,
    validate: [ required, isAddress ],
  })

  const { value } = useFieldState(etherscanAddressField)

  const etherscanAddress = useMemo(() => {
    const hasError = Boolean(isAddress(value))

    if (hasError) {
      return initialAddress
    }

    return value
  }, [ value ])

  const etherscanProvider = useMemo(() => {
    if (!window.ethereum) {
      return new providers.EtherscanProvider(chainId, 'URRTCG3RKWGV36FRGKBWWTRUZ84PUWRZUV')
    }
  }, [ chainId ])

  return {
    etherscanProvider,
    etherscanAddress,
    etherscanAddressField,
  }
}


export default useEtherscanProvider
