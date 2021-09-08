export enum ChainId {
  Mainnet = 1,
  Goerli = 5,
}

export const isChainId = (value: ChainId | number): boolean => Boolean(ChainId[value])
