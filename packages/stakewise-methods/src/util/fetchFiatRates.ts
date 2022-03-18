import { BigNumber, FixedNumber } from '@ethersproject/bignumber'

import type { Contracts } from './createContracts'


export type Currency = 'usd' | 'eur' | 'gbp'

export type FiatRates = Record<Currency, number>

const fetchFiatRates = async (fiatRateContracts: Contracts['fiatRateContracts']): Promise<FiatRates> => {
  const [ usd, eur, gbp ] = await Promise.all<BigNumber>([
    fiatRateContracts.usd.latestAnswer(),
    fiatRateContracts.eur.latestAnswer(),
    fiatRateContracts.gbp.latestAnswer(),
  ])

  const rates: Record<Currency, BigNumber> = { usd, eur, gbp }
  const result = {} as FiatRates
  const currencies = Object.keys(rates) as Currency[]
  const ethUsdRate = FixedNumber.from(usd)

  currencies.forEach((currency) => {
    const rate = rates[currency]
    const rateDivider = currency === 'usd'
      ? FixedNumber.from(100_000_000)
      : FixedNumber.from(rate)

    result[currency] = ethUsdRate.divUnsafe(rateDivider).toUnsafeFloat()
  })

  return result
}


export default fetchFiatRates
