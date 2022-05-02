import { DepositProps, Options } from '@stakewise/methods'
import { Provider } from '@ethersproject/providers'
import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'

import config from './config'
import type { Network } from './config/types'


export const validateString = (string: unknown, propertyName: string): string is string => {
  const isValid = typeof string === 'string'

  if (!isValid) {
    throw new Error(`"${propertyName}" is not type of string`)
  }

  return isValid
}

export const validateBigNumber = (bigNumber: unknown, propertyName: string): bigNumber is BigNumber => {
  const isValid = BigNumber.isBigNumber(bigNumber)

  if (!isValid) {
    throw new Error(`"${propertyName}" is not type of BigNumber`)
  }

  if (!bigNumber.gt(0)) {
    throw new Error(`"${propertyName}" must be greater than zero`)
  }

  return isValid
}

export const validateObject = (object: unknown, propertyName: string): object is Record<string, unknown> => {
  if (!object) {
    throw new Error(`"${propertyName}" is an empty object`)
  }

  const isValid = typeof object === 'object'

  if (!isValid) {
    throw new Error(`"${propertyName}" is not type of object`)
  }

  return isValid
}

export const validateAddress = (address: unknown, propertyName: string) => {
  validateString(address, propertyName)

  const isValid = isAddress(address as string)

  if (!isValid) {
    throw new Error(`"${address}" is not a valid ${propertyName}`)
  }

  return isValid
}

export const validateNetwork = (network: unknown) => {
  if (!network) {
    return true
  }

  validateString(network, 'network')

  const isValid = config.availableNetworks.includes(network as Network)

  if (!isValid) {
    const availableNetworks = config.availableNetworks.join(', ')

    throw new Error(`"${network}" is not allowed network. Please choose one of available networks: ${availableNetworks}`)
  }

  return isValid
}

export const validateProvider = (provider: unknown): provider is Provider => {
  const isValid = Provider.isProvider(provider)

  if (!isValid) {
    throw new Error('Provider is not valid')
  }

  return true
}

export const validateOptions = (options: unknown): options is Options => {
  validateObject(options, 'options')

  const { sender, referrer, network, provider } = options as Record<string, unknown>

  validateAddress(sender, 'sender')
  validateNetwork(network)
  validateProvider(provider)

  if (referrer) {
    validateAddress(referrer, 'referrer')
  }

  return true
}

export const validateDepositProps = (props: unknown): props is DepositProps => {
  validateObject(props, 'props')

  const { address, amount } = props as Record<string, unknown>

  if (address) {
    validateAddress(address, 'address')
  }

  validateBigNumber(amount, 'amount')

  return true
}
