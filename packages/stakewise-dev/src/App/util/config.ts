export const options = {
  currency: [ 'USD', 'EUR', 'GBP' ],
  network: [ 'goerli', 'mainnet' ],
  theme: [ 'dark', 'light' ],
  overlay: [ 'dark', 'blur' ],
}

export const networkToChainId = {
  mainnet: 1,
  goerli: 5,
}

export const chainIdToNetwork = {
  1: 'mainnet',
  5: 'goerli',
}
