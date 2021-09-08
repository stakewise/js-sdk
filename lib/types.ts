export type AddressSelector = {
  [chainId: number]: string
}

export enum ChainId {
  Main = 1,
  Goerli = 5,
}

export type Calldata = string

export type FilterTopics = Array<string | string[]>
