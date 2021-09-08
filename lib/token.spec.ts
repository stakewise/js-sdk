import { ChainId, Token } from '.'

describe('Token', () => {
  const address = '0x55Bd447CA73dfC90aF0e32740c0E7d90dB1def6B'
  const symbol = 'DOG'
  const name = 'Dog Money'

  describe('constructor', () => {
    it('fails with invalid address', () => {
      expect(() => new Token(ChainId.Main, '0xinvalidCA73dfC90aF0e32740c0E7d90dB1def6B', 18, symbol, name)).toThrow(
        '0xinvalidCA73dfC90aF0e32740c0E7d90dB1def6B is not a valid address'
      )
    })
    it('fails with negative decimals', () => {
      expect(() => new Token(ChainId.Main, address, -1, symbol, name)).toThrow(
        '-1 is not a valid integer or decimals range'
      )
    })
    it('fails with 256 decimals', () => {
      expect(() => new Token(ChainId.Main, address, 256, symbol, name)).toThrow(
        '256 is not a valid integer or decimals range'
      )
    })
    it('fails with non-integer decimals', () => {
      expect(() => new Token(ChainId.Main, address, 1.5, symbol, name)).toThrow(
        '1.5 is not a valid integer or decimals range'
      )
    })
  })

  describe('equals', () => {
    it('fails if address differs', () => {
      expect(
        new Token(ChainId.Main, address, 18, symbol, name).equals(
          new Token(ChainId.Main, '0xa22ad31613e389C26A32A9df0aBf67aEea4604C9', 18, symbol, name)
        )
      ).toBe(false)
    })
    it('false if chain id differs', () => {
      expect(
        new Token(ChainId.Main, address, 18, symbol, name).equals(new Token(ChainId.Goerli, address, 18, symbol, name))
      ).toBe(false)
    })
    it('true if only decimals differs', () => {
      expect(
        new Token(ChainId.Main, address, 18, symbol, name).equals(new Token(ChainId.Main, address, 10, symbol, name))
      ).toBe(true)
    })
    it('true if address is the same', () => {
      expect(
        new Token(ChainId.Main, address, 18, symbol, name).equals(new Token(ChainId.Main, address, 18, symbol, name))
      ).toBe(true)
    })
    it('true on reference equality', () => {
      const token = new Token(ChainId.Main, address, 18, symbol, name)
      expect(token.equals(token)).toBe(true)
    })
    it('true even if name and symbol differ', () => {
      expect(
        new Token(ChainId.Main, address, 18, symbol, name).equals(
          new Token(ChainId.Main, address, 18, 'CAT', 'Cat Money')
        )
      ).toBe(true)
    })
  })
})
