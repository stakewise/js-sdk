import { ChainId } from '../types'

export function isChainId(value: ChainId | number): boolean {
  return Object.keys(ChainId)
    .map((key) => ChainId[key as keyof typeof ChainId])
    .includes(value)
}
