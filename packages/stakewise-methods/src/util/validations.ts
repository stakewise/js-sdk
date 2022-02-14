import config from './config'
import { Options } from 'stakewise-methods'


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

export const validateAddress = (address: unknown) => {
  validateString(address, 'address')

  const isValid = /^0x[a-fA-F0-9]{40}$/.test(address as string)

  if (!isValid) {
    throw new Error(`"${address}" is not a valid address`)
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

  const { provider, address, network, referral } = options as Record<string, unknown>

  validateString(referral, 'referral')
  validateAddress(address)
  validateNetwork(network)
  validateProvider(provider)

  return true
}
