import { toHex } from '.'

describe('hex', () => {
  it('fails if not a number', () => {
    expect(() => toHex('hello')).toThrow(`hello is invalid big number`)
  })
  it('converts to hex', () => {
    expect(toHex('1234567890')).toEqual('0x499602d2')
  })
  it('adjusts length if not even', () => {
    expect(toHex(0xabc)).toEqual('0x0abc')
  })
})
