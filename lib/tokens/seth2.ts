import { ChainId, TokenSelector, Token } from '..'

export const SETH2: TokenSelector = {
  [ChainId.Main]: make(1, '0xFe2e637202056d30016725477c5da089Ab0A043A'),
  [ChainId.Goerli]: make(5, '0x221D9812823DBAb0F1fB40b0D294D9875980Ac19'),
}

function make(chainId: number, address: string): Token {
  return new Token(chainId, address, 18, 'sETH2', 'StakeWise Staked ETH2', 'https://stakewise.io/emerald256.png')
}
