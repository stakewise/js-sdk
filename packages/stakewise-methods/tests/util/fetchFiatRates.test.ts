import { fetchFiatRates } from '../../src/util'
import { BigNumber } from '@ethersproject/bignumber'


const mockFiatRates = {
  usd: BigNumber.from(2000 * 100_000_000),
  eur: BigNumber.from(125_000_000),
  gbp: BigNumber.from(160_000_000),
}

describe('util/fetchFiatRates.ts', () => {

  it('returns valid fiatRates', async () => {

    const mockFiatRateContracts = {
      usd: { latestAnswer: jest.fn(() => mockFiatRates['usd']) },
      eur: { latestAnswer: jest.fn(() => mockFiatRates['eur']) },
      gbp: { latestAnswer: jest.fn(() => mockFiatRates['gbp']) },
    }

    // @ts-ignore
    const fiatRates = await fetchFiatRates(mockFiatRateContracts)

    expect(Object.keys(fiatRates)).toEqual(Object.keys(mockFiatRates))
    expect(fiatRates.usd).toEqual(2000)
    expect(fiatRates.eur).toEqual(1600)
    expect(fiatRates.gbp).toEqual(1250)
  })
})
