import { ChainId, isChainId } from '../common'
import { precondition, validateAddress } from '../utils'

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

  public constructor(parameters: {
    chainId: ChainId
    address: string
    decimals: number
    symbol: string
    name: string
    icon?: string
  }) {
    const isValidChainId = isChainId(parameters.chainId)
    const isValidDecimals =
      parameters.decimals >= 0 && parameters.decimals < 255 && Number.isInteger(parameters.decimals)
    precondition(isValidChainId, `${parameters.chainId} is not a valid chain id`)
    precondition(isValidDecimals, `${parameters.decimals} is not a valid integer or decimals range`)
    this.chainId = parameters.chainId
    this.address = validateAddress(parameters.address)
    this.decimals = parameters.decimals
    this.symbol = parameters.symbol
    this.name = parameters.name
    this.icon = parameters.icon
  }

  public equals(other: Token): boolean {
    return this.chainId === other.chainId && this.address === other.address
  }
}
