import { NetworkConfig } from './types'


const mainnetConfig: NetworkConfig = {
  api: {
    rest: 'https://api.stakewise.io',
  },
  addresses: {
    pool: '0xC874b064f465bdD6411D45734b56fac750Cda29A',
    swiseToken: '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2',
    stakedToken: '0xFe2e637202056d30016725477c5da089Ab0A043A',
    rewardToken: '0x20BC832ca081b91433ff6c17f85701B6e92486c5',
    ethUsdRate: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    eurUsdRate: '0xb49f677943BC038e9857d61E7d053CaA2C1734C1',
    gbpUsdRate: '0x5c0Ab2d9b5a7ed9f470386e82BB36A3613cDd4b5',
  }
}


export default mainnetConfig
