import { ChainId } from '../common'
import { Token, TokenSelector } from './token'

export const WETH9: TokenSelector = {
  [ChainId.Mainnet]: make(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
  [ChainId.Goerli]: make(5, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'),
}

function make(chainId: number, address: string): Token {
  return new Token({
    chainId,
    address,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://stakewise.io/eth-icon.png',
  })
}
