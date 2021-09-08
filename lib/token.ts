import invariant from 'tiny-invariant'
import { ChainId } from '.'
import { validateAddress, isChainId } from './utils'

export type TokenSelector = {
  [chainId: number]: Token
}

export class Token {
  public readonly chainId: number

  public readonly address: string

  public readonly decimals: number

  public readonly symbol: string

  public readonly name: string

  public readonly icon?: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol: string, name: string, icon?: string) {
    invariant(isChainId(chainId), `${chainId} is not a valid chain id`)
    invariant(
      decimals >= 0 && decimals < 255 && Number.isInteger(decimals),
      `${decimals} is not a valid integer or decimals range`
    )
    this.chainId = chainId
    this.address = validateAddress(address)
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.icon = icon
  }

  public equals(other: Token): boolean {
    return this.chainId === other.chainId && this.address === other.address
  }
}
