import { ChainId } from '../common'
import { Token, TokenSelector } from './token'

export const RETH2: TokenSelector = {
  [ChainId.Mainnet]: make(1, '0x20BC832ca081b91433ff6c17f85701B6e92486c5'),
  [ChainId.Goerli]: make(5, '0x826f88d423440c305D9096cC1581Ae751eFCAfB0'),
}

function make(chainId: number, address: string): Token {
  return new Token({
    chainId,
    address,
    decimals: 18,
    symbol: 'rETH2',
    name: 'StakeWise Reward ETH2',
    icon: 'https://stakewise.io/red256.png',
  })
}
