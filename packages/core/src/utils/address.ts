import { getAddress } from '@ethersproject/address'

export type AddressSelector = {
  [chainId: number]: string
}

export function validateAddress(address: string): string {
  try {
    return getAddress(address)
  } catch (ignore) {
    throw new Error(`${address} is not a valid address`)
  }
}
