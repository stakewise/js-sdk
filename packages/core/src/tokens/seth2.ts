import { ChainId } from '../common'
import { Token, TokenSelector } from './token'

export const SETH2: TokenSelector = {
  [ChainId.Mainnet]: make(1, '0xFe2e637202056d30016725477c5da089Ab0A043A'),
  [ChainId.Goerli]: make(5, '0x221D9812823DBAb0F1fB40b0D294D9875980Ac19'),
}

function make(chainId: number, address: string): Token {
  return new Token({
    chainId,
    address,
    decimals: 18,
    symbol: 'sETH2',
    name: 'StakeWise Staked ETH2',
    icon: 'https://stakewise.io/emerald256.png',
  })
}
