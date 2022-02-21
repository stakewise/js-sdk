export type Network = 'mainnet'

export type NetworkConfig = {
  api: {
    rest: string
  }
  addresses: {
    pool: string
    swiseToken: string
    stakedToken: string
    rewardToken: string
  }
}

export type Config = Record<Network, NetworkConfig> & {
  defaultNetwork: Network
  availableNetworks: Network[]
}
