import { ChainId, TokenSelector, Token } from '..'

export const SWISE: TokenSelector = {
  [ChainId.Main]: make(1, '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2'),
  [ChainId.Goerli]: make(5, '0x0e2497aACec2755d831E4AFDEA25B4ef1B823855'),
}

function make(chainId: number, address: string): Token {
  return new Token(chainId, address, 18, 'SWISE', 'StakeWise', 'https://stakewise.io/purple256.png')
}
