import { ChainId, isChainId } from './chainId'

describe('ChainId', () => {
  it('fails if chain id is invalid', () => {
    expect(isChainId(1000)).toBeFalsy()
  })
  it('validates supported chain ids', () => {
    expect(isChainId(ChainId.Mainnet)).toBeTruthy()
    expect(isChainId(ChainId.Goerli)).toBeTruthy()
  })
})
