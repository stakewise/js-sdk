import { isChainId } from '.'
import { ChainId } from '..'

describe('ChainId', () => {
  it('fails if chain id is invalid', () => {
    expect(isChainId(1000)).toBeFalsy()
  })
  it('validates supported chain ids', () => {
    expect(isChainId(ChainId.Main)).toBeTruthy()
    expect(isChainId(ChainId.Goerli)).toBeTruthy()
  })
})
