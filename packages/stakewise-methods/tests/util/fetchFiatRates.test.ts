import { BigNumber } from '@ethersproject/bignumber'
import { fetchFiatRates } from '../../src/util'


const mockFiatRates = {
  ethUsd: BigNumber.from(2000 * 100_000_000),
  eurUsd: BigNumber.from(125_000_000),
  gbpUsd: BigNumber.from(160_000_000),
}

describe('util/fetchFiatRates.ts', () => {

  it('returns valid fiatRates', async () => {

    const mockFiatRateContracts = {
      ethUsd: { latestAnswer: jest.fn(() => mockFiatRates['ethUsd']) },
      eurUsd: { latestAnswer: jest.fn(() => mockFiatRates['eurUsd']) },
      gbpUsd: { latestAnswer: jest.fn(() => mockFiatRates['gbpUsd']) },
    }

    // @ts-ignore
    const fiatRates = await fetchFiatRates(mockFiatRateContracts)

    expect(Object.keys(fiatRates)).toEqual(Object.keys(mockFiatRates))
    expect(fiatRates.ethUsd).toEqual(2000)
    expect(fiatRates.eurUsd).toEqual(1600)
    expect(fiatRates.gbpUsd).toEqual(1250)
  })
})
