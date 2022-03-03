require('@nomiclabs/hardhat-waffle')
require("@nomiclabs/hardhat-ethers")
require('hardhat-jest-plugin')
require('hardhat-abi-exporter')


module.exports = {
  solidity: '0.7.5',
  networks: {
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
        blockNumber: 13952000,
      }
    },
  },
  abiExporter: {
    path: './src/util/abi',
    only: [
      'PoolAbi',
      'RewardEthTokenAbi',
      'StakedEthTokenAbi',
      'StakeWiseTokenAbi',
    ],
    clear: true,
    flat: true,
  },
  throwOnTransactionFailures: true
}
