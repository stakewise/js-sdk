export type Config = {
  defaultNetwork: string
  availableNetworks: string[]
  addresses: Record<keyof typeof addresses, string>
}

const addresses = {
  multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  swiseToken: '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2',
  stakedToken: '0xFe2e637202056d30016725477c5da089Ab0A043A',
  rewardToken: '0x20BC832ca081b91433ff6c17f85701B6e92486c5',
} as const

const config: Config = {
  defaultNetwork: 'mainnet',
  availableNetworks: [ 'mainnet' ],
  addresses,
}


export default config
