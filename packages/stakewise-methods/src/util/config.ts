const defaultNetwork = 'mainnet'
const availableNetworks = [ defaultNetwork ]

type NetworkAddresses = {
  multicall: string
  swiseToken: string
  stakedToken: string
  rewardToken: string
}

export type Config = {
  defaultNetwork: string
  availableNetworks: string[]
  addresses: Record<string, NetworkAddresses>
}

const mainnetAddresses: NetworkAddresses = {
  multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  swiseToken: '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2',
  stakedToken: '0xFe2e637202056d30016725477c5da089Ab0A043A',
  rewardToken: '0x20BC832ca081b91433ff6c17f85701B6e92486c5',
}

const addresses = {
  [defaultNetwork]: mainnetAddresses
}

const config: Config = {
  availableNetworks,
  defaultNetwork,
  addresses,
}


export default config
