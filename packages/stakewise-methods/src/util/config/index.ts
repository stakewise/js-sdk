import mainnetConfig from './mainnet'
import { Network, Config } from './types'


const defaultNetwork: Network = 'mainnet'
const availableNetworks: Network[] = [ defaultNetwork ]

const config: Config = {
  defaultNetwork,
  availableNetworks,
  [defaultNetwork]: mainnetConfig,
}


export default config
