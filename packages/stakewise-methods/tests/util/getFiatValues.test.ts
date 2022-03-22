import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'
import { getFiatValues } from '../../src/util'
import type { Rate } from '../../src/util'


const mockFiatRates: Record<Rate, number> = {
  ethUsd: 2000,
  eurUsd: 1600,
  gbpUsd: 1250,
}

const mockEth = parseEther('10')

describe('util/getFiatValues.ts', () => {

  it('returns valid fiatValues', async () => {
    const value = BigNumber.from(mockEth)

    const fiatValues = getFiatValues({ value, fiatRates: mockFiatRates })

    expect(Object.keys(fiatValues).length).toEqual(3)
    expect(fiatValues.usd).toEqual(20000)
    expect(fiatValues.eur).toEqual(16000)
    expect(fiatValues.gbp).toEqual(12500)
  })
})
