import { BigNumber } from '@ethersproject/bignumber'
import { getFiatValues } from '../../src/util'


const mockFiatRates = {
  usd: 2000,
  eur: 1600,
  gbp: 1250,
}

describe('util/getFiatValues.ts', () => {

  it('returns valid fiatValues', async () => {
    const value = BigNumber.from(10)

    const fiatValues = getFiatValues({ value, fiatRates: mockFiatRates })

    expect(Object.keys(fiatValues)).toEqual(Object.keys(mockFiatRates))
    expect(fiatValues.usd).toEqual(20000)
    expect(fiatValues.eur).toEqual(16000)
    expect(fiatValues.gbp).toEqual(12500)
  })
})
