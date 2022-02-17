import { Options } from 'stakewise-methods'
import { isAddress } from '@ethersproject/address'
import config from './config'


export const validateString = (string: unknown, propertyName: string): string is string => {
  const isValid = typeof string === 'string'

  if (!isValid) {
    throw new Error(`"${propertyName}" is not type of string`)
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

  const isValid = config.availableNetworks.includes(network as string)

  if (!isValid) {
    const availableNetworks = config.availableNetworks.join(', ')

    throw new Error(`"${network}" is not allowed network. Please choose one of available networks: ${availableNetworks}`)
  }

  return isValid
}

export const validateProvider = (provider: unknown) => {
  validateObject(provider, 'provider')

  return true
}

export const validateOptions = (options: unknown): options is Options => {
  validateObject(options, 'options')

  const { address, referral, network, provider } = options as Record<string, unknown>

  validateAddress(address, 'address')
  validateAddress(referral, 'referral')
  validateNetwork(network)
  validateProvider(provider)

  return true
}
